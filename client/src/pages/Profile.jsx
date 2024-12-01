import { FileUpload } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar } from '@mui/material';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BounceLoader from "react-spinners/BounceLoader";
import MessageRoom from '../components/MessageRoom';
import { addProfileImage } from '../redux/slices/userSlice';
import ProfileConnectionCard from './ProfileConnectionCard';
import ProfileConnections from './ProfileConnections';
const Profile = () => {
    const [isActive, setIsActive] = useState('info');
    const [profileImage,setProfileImage]=useState(null);
    const [isLoadingImage,setIsLoadingImage]=useState(false);
    const {user}=useSelector((store)=>store.user);

    const imgInp=useRef(null);

    const {connections}=useSelector(store=>store.user);

    const requestsForConnect=connections.filter((item)=>item?.receiver?._id === user?._id && item?.status === 'pending');

    const allConnectedUsers=connections.filter((item)=>{
        const isStatus=item?.status === 'accepted';
        const isHisConnection=item?.sender?._id === user?._id || item?.receiver?._id === user?._id;
        console.log(isStatus," ",isHisConnection," ",item)
        return isStatus && isHisConnection
    });
    console.log("allConnectedUsers :",allConnectedUsers)

    const dispatch=useDispatch();

    const imageUrl=user?.profilePicture ? `http://localhost:8080/${user.profilePicture}`:'';

    console.log("imageUrl :",imageUrl)
    const handleProfileLoad=()=>{
          imgInp.current.click();
    }

    const handleImageUpload=async(event)=>{
        const file=event.target.files[0];
        if(file){
          // Validate file type and size
          const validImageTypes = ['image/jpeg','image/jpg', 'image/png', 'image/gif'];
          const maxFileSize = 5 * 1024 * 1024; // 5MB

          if (!validImageTypes.includes(file.type)) {
            alert('Please upload a valid image (JPEG,JPG, PNG, or GIF)');
            return;
          }
          if (file.size > maxFileSize) {
            alert('Image size should be less than 5MB');
            return;
          }

        // Create a URL for the image preview
        const imageUrl = URL.createObjectURL(file);
        setProfileImage(imageUrl);
        // Create FormData for file upload
        const formData = new FormData();
        formData.append('profileImage', file);

        try {
            // Replace with your actual upload API endpoint
              setIsLoadingImage(true);
              const response = await axios.post('http://localhost:8080/user/api/profileImage',formData, {
                 headers:{
                    "Content-Type":"multipart/form-data"
                 },
                 withCredentials:true
              });
  
              if (response) {
                  // Dispatch action to update user's profile image in Redux store
                  dispatch(addProfileImage(response?.data?.imageName));
                  console.log("Uploaded Image res :",response)
              } else {
                  console.log('Image upload failed');
              }
           } catch (error) {
            console.error('Error uploading profile image:', error);
            alert('Failed to upload profile image');
            // Revert image preview if upload fails
            setProfileImage(null);
        }finally{
            setIsLoadingImage(false);
        }

        }

    }

    return (
        <div className='w-full sm:w-[95%] xl:w-[1240px] bg-white px-2 mx-auto'>
        <div className='flex gap-2 items-center py-5'>
             <div onClick={handleProfileLoad} className='relative group rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-500 transition-all duration-300'>
              <Avatar 
                  alt="Profile Picture" 
                  src={profileImage || imageUrl || ""} 
                  className='w-full h-full'
                  sx={{
                      width: {
                          xs: 64,
                          sm: 64,
                          md: 100
                      },
                      height: {
                          xs: 64,
                          sm: 64,
                          md: 100
                      }
                  }}
              />
              <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-300'>
                {
                    isLoadingImage ? <BounceLoader /> :
                    <FileUpload className='text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-2xl'/>
                }

              </div>
            </div>

                <div className='flex-1'>
                    <p className='text-2xl font-bold'>{user?.name}</p>
                    <p className='text-lg font-serif'>{user?.profile?.bio}</p>
                </div>
                <EditIcon className='cursor-pointer hover:text-blue-500' />
            </div>
            <input hidden type='file' onChange={handleImageUpload} accept='image/jpeg,image/png,image/jpg,image/gif' ref={imgInp}/>

            <hr className='mt-5 mb-5' />

            <div className='flex overflow-x-auto' style={{scrollbarWidth:"thin",WebkitOverflowScrolling:'touch'}}>
                <button className={`hover:bg-blue-400 py-2 px-4 rounded-xl flex-shrink-0 text-sm m-2 ${isActive === 'info' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setIsActive('info')}>💡 My info</button>
                <button className={`hover:bg-blue-400 py-2 px-4 rounded-xl flex-shrink-0 text-sm m-2 ${isActive === 'connect' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setIsActive('connect')}>🤝 Connect Me</button>
                <button className={`hover:bg-blue-400 py-2 px-4 rounded-xl flex-shrink-0 text-sm m-2 ${isActive === 'messages' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setIsActive('messages')}>💬 Messages</button>
                <button className={`hover:bg-blue-400 py-2 px-4 rounded-xl flex-shrink-0 text-sm m-2 ${isActive === 'connections' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setIsActive('connections')}>🌐 Connections</button>
                <button className={`hover:bg-blue-400 py-2 px-4 rounded-xl flex-shrink-0 text-sm m-2 ${isActive === 'posts' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setIsActive('posts')}>📝 Posts</button>
            </div>

{ isActive === 'info' && (
    <div className='bg-white rounded-2xl p-6 mx-4 my-2'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-4'>
                <div className='flex items-center'>
                    <span className='w-24 text-gray-600 font-medium'>Name</span>
                    <p className='text-sm font-semibold text-gray-800'>{user?.name}</p>
                </div>
                <div className='flex items-center'>
                    <span className='w-24 text-gray-600 font-medium'>Email</span>
                    <p className='text-sm font-semibold text-blue-600'>{user?.email}</p>
                </div>
                <div className='flex'>
                    <span className='w-24 text-gray-600 font-medium mb-2'>bio</span>
                    <p className='flex-1 text-sm text-gray-700 leading-relaxed'>
                    {user?.profile?.bio}
                    </p>
                </div>
                <div className='flex items-center'>
                    <span className='w-24 text-gray-600 font-medium'>Profile Type</span>
                    <p className='text-sm font-semibold text-green-600'>Educational Service {user?.role}</p>
                </div>

                {
                    user?.role==='provider' && (
                    <div className='flex items-center'>
                        <span className='w-24 text-gray-600 font-medium'>mode</span>
                        <p className='text-sm font-semibold text-red-600'>{user?.profile?.mode}</p>
                    </div>
                    )
                }
            </div>
            <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='bg-gray-100 rounded-xl p-4 text-center'>
                        <h4 className='text-sm text-gray-600'>Posts</h4>
                        <p className='text-2xl font-bold text-blue-600'>{user?.posts?.length}</p>
                    </div>
                    <div className='bg-gray-100 rounded-xl p-4 text-center'>
                        <h4 className='text-sm text-gray-600'>Bookmarks</h4>
                        <p className='text-2xl font-bold text-purple-600'>{user?.bookmarks?.length}</p>
                    </div>
                    <div className='bg-gray-100 rounded-xl p-4 text-center'>
                        <h4 className='text-sm text-gray-600'>Followers</h4>
                        <p className='text-2xl font-bold text-green-600'>{user?.followers?.length}</p>
                    </div>
                    <div className='bg-gray-100 rounded-xl p-4 text-center'>
                        <h4 className='text-sm text-gray-600'>Following</h4>
                        <p className='text-2xl font-bold text-red-600'>{user?.followed?.length}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='mt-6 flex justify-end'>
            <button className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold transition-colors duration-300'>
                Edit Profile
            </button>
        </div>
    </div>
)}

{
     isActive === 'messages' ? //All Connected users with status 'accepted'
         <div className="w-full mb-2 py-2 flex flex-wrap">
          <MessageRoom connectedUsers={allConnectedUsers} user={user}/>
         </div>
         : ''
}


            {
                isActive === 'connections' ? //All Connected users with status 'accepted'
                    <div className="w-full mb-2 py-2 flex flex-wrap">
                        {
                            allConnectedUsers?.length===0 ?
                           <div className='w-full h-52 flex justify-center items-center'><h1>No Connection Found</h1></div>:
                            allConnectedUsers.map((connection) => <ProfileConnections key={connection?._id} connection={connection} user={user}/>)
                        }
                    </div>
                    : ''
            }

            {
                isActive === 'connect' ?  //Connect Me
                    <div className="w-full mb-2 py-2 flex flex-wrap">
                        {
                           !requestsForConnect || requestsForConnect?.length===0 ?
                           <div className='w-full h-52 flex justify-center items-center'><h1>No Connection request</h1></div>:
                            requestsForConnect.map((connection) => <ProfileConnectionCard key={connection?._id} sender={connection?.sender}/>)
                        }
                    </div>
                    : ''
            }

           {
                isActive === 'posts' ?  //Connect Me
                    <div className="w-full mb-2 py-2 flex flex-wrap">
                           <div className='w-full h-52 flex justify-center items-center'><h1>No Post available</h1></div>   
                    </div>
                    : ''
            }


        </div>
    )
}

export default Profile