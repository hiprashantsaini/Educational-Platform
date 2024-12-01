import { Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";


const ProfileConnections = ({ connection,user }) => {
    // const imageUrl=connection?.sender?.profilePicture ? `http://localhost:8080/${connection?.sender?.profilePicture}`:'';
    let imageUrl='';
    if(connection?.sender?._id === user?._id && connection?.receiver?._id === user?._id){
       imageUrl=`http://localhost:8080/${connection?.sender?.profilePicture}`
    }else if(connection?.sender?._id === user?._id){
       imageUrl=`http://localhost:8080/${connection?.receiver?.profilePicture}`
    }else if(connection?.receiver?._id === user?._id){
       imageUrl=`http://localhost:8080/${connection?.sender?.profilePicture}`
     }
    console.log("ProfileConnections imageUrl :",imageUrl,connection)

    const formatDate = (dateString) => {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-indexed
        const year = date.getFullYear();
    
        return `${day}/${month}/${year}`;
      };
    return (
        <div className=" p-2 w-full sm:w-1/2 lg:w-1/3">
            <div className="bg-white relative rounded-lg shadow-md p-4">
            {connection?.createdAt && (
              <p className="text-xs sm:text-sm absolute top-1 right-2 text-gray-500 mt-1">
               {formatDate(connection?.createdAt)}
              </p>
            )}
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
                       <Link className="hover:text-red-600"><h3 className="text-lg font-semibold">{connection?.sender?._id===user?._id ? connection?.receiver?.name : connection?.sender?.name}</h3></Link> 
                        <p className="text-gray-600">{connection?.sender?._id===user?._id ? connection?.receiver?.role : connection?.sender?.role}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileConnections;
