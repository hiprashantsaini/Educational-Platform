import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { upDateOneConnection } from "../redux/slices/userSlice";
import { useSocket } from "../socketContext";

const ProfileConnectionCard = ({ sender }) => {
    console.log("ProfileConnectionCard :",sender)
    const socket=useSocket();
    const dispatch=useDispatch();
    const {user}=useSelector(store=>store.user);

    const imageUrl=sender?.profilePicture ? `http://localhost:8080/${sender.profilePicture}`:'';
    const handleAccept=()=>{
        try {
            if(user && socket){
                socket.emit('acceptConnection',{
                    acceptor:user?._id,
                    sender:sender?._id,
                    status:'accepted'
                });
            }else{
                console.log("handleAccept: Try again later")
            }

        } catch (error) {
            console.log("handleAccept error");
        }
    }

    useEffect(()=>{
        if(user && socket){
            socket.on('acceptConnectionConferm',(data)=>{
                console.log("acceptConnectionConfirm :",data);
                dispatch(upDateOneConnection(data?.connection))
            })

            return ()=>{
                socket.off('acceptConnectionConfirm');
            }
        }
    },[socket])

    return (
        <div className=" p-2 w-full sm:w-1/2 lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                    <Avatar alt="Remy Sharp" src={imageUrl}
                        sx={{
                            width: {
                                xs: 32,
                                sm: 48,
                                md: 64
                            },
                            height: {
                                xs: 32,
                                sm: 48,
                                md: 64
                            }
                        }}
                    />
                    <div className="ml-4">
                        <h3 className="text-lg font-semibold">{sender?.name}</h3>
                        <p className="text-gray-600">{sender?.role}</p>
                    </div>
                </div>
                <p className="text-sm text-gray-700">
                    Expertise: {sender?.expertise}
                </p>
                <div className="flex items-center justify-between mt-4">
                    <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                        {sender?.courseType}
                    </span>

                    <div className="flex-1 flex justify-end gap-2">
                    <button
                        onClick={handleAccept}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md"
                    >
                        Accept
                    </button>
                    <button
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded-md"
                    >
                        Reject
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileConnectionCard;
