const express=require("express")
const mongoose=require("mongoose");
const userRoute = require("./routes/userRoute");
const cookieParser=require('cookie-parser');
const cors=require('cors');

const http=require('http');
const {Server}=require('socket.io');
const Conn = require("./models/connection");


mongoose.connect("mongodb://127.0.0.1:27017/Job_Platform");
const app=express();
const server=http.createServer(app);
app.use(express.static('uploads'))

////Full Duplex communication start here
const io=new Server(server,{
    cors:{
        oringin:"*",
        methods:['GET','POST'],
        credentials:true
    }
});


const connectedUsers=new Map();

io.on('connection',(socket)=>{
    console.log("a user connected.")

    socket.on('registerUser', (userData) => {
        connectedUsers.set(userData.userId, { ...userData, socketId: socket.id });
    });

    socket.on('sendConnectRequest',async({fromUserId, toUserId})=>{
        const recipient=connectedUsers.get(toUserId);

        const isConnExists=await Conn.findOne({sender:fromUserId,receiver:toUserId});
        console.log("isConnExists :",isConnExists)
        if(isConnExists){
            return socket.emit('connectionRequestSent',{message:"This connection request has already made.",connData:isConnExists});
        }
        
        const conn=new Conn({
            sender:fromUserId,
            receiver:toUserId,
            status:'pending'
        });

        await conn.save();
        const connectionData=await Conn.findOne({sender:fromUserId,receiver:toUserId}).populate('sender', 'name profilePicture role profile').populate('receiver', 'name profilePicture role profile');

        if(recipient){
            io.to(recipient.socketId).emit('receiveConnectRequest',{
                connData:connectionData,
                message: `${fromUserId} has sent you a connection request!`,
            });
            console.log(`Connection request sent from ${fromUserId} to ${toUserId}`);

            socket.emit('connectionRequestSent',{message:"Connection request sent",connData:connectionData});
        }else{
            console.log(`User with ID ${toUserId} is not online.`);
            socket.emit('connectionRequestSent',{message:"Connection request sent, but user is not live",connData:connectionData});
        }
    })

    socket.on('acceptConnection',async({acceptor,sender,status})=>{
        console.log("acceptConnection",acceptor,sender,status);
        
        const connData=await Conn.findOneAndUpdate({$and:[{sender:sender},{receiver:acceptor}]},{$set:{status:'accepted'}},{new:true}).populate('sender', 'name profilePicture role profile').populate('receiver', 'name profilePicture role profile');

        socket.emit('acceptConnectionConferm',{
            message:"Acceptence is confirmed",
            connection:connData
        })

       const ifRequestSenderLive=connectedUsers.get(sender);
       if(ifRequestSenderLive){
        io.to(ifRequestSenderLive.socketId).emit('connectionAccepted',{
            message:"Your connection is accepted",
            connection:connData
        });
       }
    })
    socket.on('disconnect',()=>{
        connectedUsers.forEach((value,key)=>{
            if(value.socketId === socket.id){
                connectedUsers.delete(key);
                console.log(`User disconnected: ${key}`);
            }
        })
    })
})


////Full Duplex communication code ends here

app.use(cookieParser());

const corsOptions={
    origin:"http://localhost:3000",
    credentials:true

}

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/user/api',userRoute);


server.listen((8080),()=>{
    console.log("server is running at ",8080);
})