import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import io from "socket.io-client";
import ConnectionCard from "../components/ConnectionCard";
import { pushOneConnection, upDateOneConnection } from "../redux/slices/userSlice";
import { useSocket } from "../socketContext";


const Connections = () => {
  // const socket=io("http://localhost:8080");
  // const {socket} =useSelector(store=>store.socketio);

  const socket=useSocket();

  const dispatch=useDispatch();
  const { users,user,connections,filteredUsers} = useSelector((store) => store.user);


  useEffect(()=>{
     if(user && socket){
      socket.emit('registerUser', { userId: user._id });

      socket.on('receiveConnectRequest',(data)=>{
        console.log("receiveConnectRequest :",data);
        dispatch(pushOneConnection(data?.connData))
      })

      socket.on('connectionRequestSent',(data)=>{
        console.log("connectionRequestSent ",data.message,data);
        dispatch(pushOneConnection(data?.connData))
      })

      socket.on('connectionAccepted',(data)=>{
        dispatch(upDateOneConnection(data?.connection))
        console.log("connectionAccepted :",data);
      })

      return ()=>{
        socket.off('receiveConnectRequest');
        socket.off('connectionRequestSent');
        socket.off('connectionAccepted');
      }

     }
  },[socket,user])

  return (
    <div className="w-full mb-2 py-2 flex flex-wrap">
      {
      filteredUsers &&
      filteredUsers.map((filteredUser, i) => {
        const conn = connections?.find(
          (item) =>
            (item?.receiver?._id === filteredUser?._id && item?.sender?._id === user?._id) ||
            (item?.sender?._id === filteredUser?._id && item?.receiver?._id === user?._id)
        ); // Ensures the connection matches both sender and receiver
        console.log("Connection for user:", filteredUser?.name, "=>", conn);
        return <ConnectionCard key={i} filteredUser={filteredUser} conn={conn} socket={socket} />;
      })
      }
    </div >
  );
};

export default Connections;
