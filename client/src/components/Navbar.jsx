import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { changePage } from '../redux/slices/activPageSlice';
import { addUser } from '../redux/slices/userSlice';

const Navbar = ({ showLogin, setShowLogin, showSignUp, setShowSignUp }) => {
  const {user} = useSelector((store) => store.user);
  const activePage = useSelector((store) => store.activePage);

  const page=activePage.page ? activePage.page :'home';
  const navigate=useNavigate();
   const dispatch=useDispatch();

   const logout=async()=>{
    try {
      
      if(!window.confirm("You will Logout")){
        return;
      }

       await axios.get("http://localhost:8080/user/api/logout",{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      });
       dispatch(addUser(null));
       dispatch(changePage('home'));
       navigate('/');
       
    } catch (error) {
      console.log("error :",error);
    }
   }
  return (
    <nav className='w-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg mb-2'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center max-[300px]:flex-col max-[300px]:pb-2 justify-between h-16'>
          {/* Logo Section */}
          <div className='flex items-center'>
            <div className='flex-shrink-0 flex items-center'>
              <span className='ml-3 text-2sm sm:text-xl font-bold tracking-wider'>MyApp</span>
            </div>
          </div>


          <div className='flex space-x-4'>
              <Link  
                    to="/"
                    onClick={()=>dispatch(changePage('home'))}
                    className={`transition-all duration-300 px-2 py-1 sm:px-4 sm:py-2 rounded-full text-sm font-medium ${page==='home'?'bg-white text-blue-900':'bg-white bg-opacity-20 hover:bg-opacity-30'}`}>
                    Home
              </Link>
            {
              !user ? (
                <>
                  <button onClick={() =>{
                    dispatch(changePage('login'))
                    setShowLogin(true)
                    }} className={`transition-all duration-300 px-2 py-1 sm:px-4 sm:py-2 rounded-full text-sm font-medium ${page==='login'?'bg-white text-blue-900':'bg-white bg-opacity-20 hover:bg-opacity-30'}`}>
                    Login
                  </button>
                  <button onClick={() => {
                    dispatch(changePage('signup'))
                    setShowSignUp(true)
                    }} className={`transition-all duration-300 px-2 py-1 sm:px-4 sm:py-2 rounded-full text-sm font-medium ${page==='signup'?'bg-white text-blue-900':'bg-white bg-opacity-20 hover:bg-opacity-30'}`}>
                    Sign Up
                  </button>
                  </>
                )
              :
                (
                  <>
                  <Link
                    to="/profile"
                    onClick={()=>dispatch(changePage('profile'))}
                    className={`transition-all duration-300 px-2 py-1 sm:px-4 sm:py-2 rounded-full text-sm font-medium ${page==='profile'?'bg-white text-blue-900':'bg-white bg-opacity-20 hover:bg-opacity-30'}`}>
                    Profile
                  </Link>
                  <button onClick={logout} className='bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 px-2 py-1 sm:px-4 sm:py-2 rounded-full text-sm font-medium'>
                    Logout
                  </button>
                  </>
                )
          }

          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar