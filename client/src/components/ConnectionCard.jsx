import { Avatar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";


const ConnectionCard = ({ filteredUser, socket, conn }) => {
  const { user } = useSelector((store) => store.user);

  const imageUrl=filteredUser?.profilePicture ? `http://localhost:8080/${filteredUser.profilePicture}`:'';

  const handleConnect = async () => {
    if(user && filteredUser){
      socket.emit('sendConnectRequest', {
        fromUserId: user._id,
        toUserId: filteredUser._id,
      });
    }else{
      console.log("handleConnect error");
      alert("First Login")
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const getButtonValue = () => {
    if (!conn || !user) {
      return { label: 'Connect', color: 'bg-blue-600', action: handleConnect };
    }
  
    if (conn.status === 'accepted') {
      return { label: 'Connected', color: 'bg-green-600' };
    }
  
    if (conn.status === 'pending') {
      if (conn.receiver?._id === user?._id) {
        return { label: 'Sent Conn', color: 'bg-yellow-600' };
      }
      return { label: 'Pending', color: 'bg-red-600' };
    }
    if(conn.status === 'rejected'){
      return { label: 'Rejected', color: 'bg-red-600' };
    }
  
    return { label: conn?.status || 'Connect', color: conn?.status ? 'bg-red-600' : 'bg-blue-600', action: handleConnect };
  };

  
  
  const buttonDetails = getButtonValue();
  
  return (
    <div className=" p-2 w-full sm:w-1/2 lg:w-1/3">
      <div className="bg-white relative rounded-lg shadow-md p-6">
           {filteredUser?.createdAt && (
              <p className="text-xs sm:text-sm absolute top-1 right-2 text-gray-500 mt-1">
               {formatDate(filteredUser.createdAt)}
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
            <h3 className="text-lg font-semibold">{filteredUser?.name.length > 18 ? filteredUser?.name?.slice(0,18)+'...' : filteredUser?.name}</h3>
            <p className="text-gray-600">{filteredUser?.profile?.bio?.length > 20 ? filteredUser?.profile?.bio?.slice(0,20)+'...' : filteredUser?.profile?.bio}</p>
          </div>
        </div>
        {
          filteredUser?.role === 'seeker' ? 'Seeker'
            :
            <p className="text-sm text-gray-700">
              Course:{filteredUser?.profile?.course[0]?.length > 15 ? filteredUser?.profile?.course[0]?.slice(0,15)+'...' : filteredUser?.profile?.course[0]}
            </p>
        }

        <div className="flex items-center justify-between mt-4">
          {
          filteredUser?.role === 'seeker' ? 
          <span className="rounded-full text-xs bg-blue-100 text-blue-800">
          </span>
           :
           <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
           {filteredUser?.profile?.mode}
           </span>
          }  
          <button
          onClick={buttonDetails.action || null}
          className={`px-4 py-2 text-white rounded-md hover:opacity-90 ${buttonDetails.color}`}
        >
          {buttonDetails.label}
        </button>
        </div>
      </div>
    </div>
  )
};


export default ConnectionCard;
