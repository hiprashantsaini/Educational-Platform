import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
// import io from "socket.io-client"
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import useGetAllConnections from '../hooks/useGetAllConnections'
import useGetAllUsers from '../hooks/useGetAllUsers'
import useGetUserData from '../hooks/useGetUserData'
// import { addSocket } from '../redux/slices/socketSlice'

const Layout = () => {
  const [showLogin,setShowLogin]=useState(false);
  const [showSignUp,setShowSignUp]=useState(false);

  const dispatch=useDispatch();
  
  // const socket=io('http://localhost:8080');

  useGetAllUsers();
  useGetUserData();
  useGetAllConnections();

  // if(socket){
  //   dispatch(addSocket(socket));
  // }

  return (
    <div className='w-full bg-[#e8e9ea] pt-1'>
    <Navbar showLogin={showLogin} setShowLogin={setShowLogin} showSignUp={showSignUp} setShowSignUp={setShowSignUp}/>
    {
      showLogin && (
        <SignIn showLogin={showLogin} setShowLogin={setShowLogin} setShowSignUp={setShowSignUp}/>
      )
    }  

    {
      showSignUp && (
        <SignUp showSignUp={showSignUp} setShowSignUp={setShowSignUp} setShowLogin={setShowLogin}/>
      )
    }
    <Outlet/>
    <Footer/>
   </div>
  )
}

export default Layout