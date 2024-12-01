import { Email, Https } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import PulseLoader from "react-spinners/PulseLoader";
import { changePage } from '../redux/slices/activPageSlice';
import { addUser } from '../redux/slices/userSlice';

const SignIn = ({ showLogin, setShowLogin, onSignIn,setShowSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading,setLoading]=useState(false);

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      if (validateForm()) {
          setLoading(true);
          const res=await axios.post("http://localhost:8080/user/api/login",{email,password},{
            headers:{
              'Content-Type':'application/json',
            },
            withCredentials:true
          });
          dispatch(addUser(res?.data?.user));
          setEmail('');
          setPassword('');
          setShowLogin(false);
          dispatch(changePage('home'))
          navigate('/');
      }
    } catch (error) {
       console.log("error",error);
    }finally{
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className='fixed inset-0 bg-gray-200 bg-opacity-50 z-50 flex items-center justify-center px-1 ms:px-4 py-6'>
      <div className='relative bg-white p-4 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md mx-auto'>
        {/* Close Button */}
        <CloseIcon 
          onClick={() =>{
            dispatch(changePage('home'))
            setShowLogin(false)
          }} 
          className='absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-300'
          style={{ fontSize: '2rem' }}
        />

        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <h1 className='text-xl sm:text-3xl font-bold text-gray-800 mb-2'>Welcome Back!</h1>
          <p className='text-2sm sm:text-lg text-gray-500 text-center'>Login to continue your journey</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Email Input */}
          <div className={`
            relative
            border 
            ${errors.email ? 'border-red-500' : 'border-gray-300 focus-within:border-blue-500'}
            rounded-lg 
            transition-colors 
            duration-300
            flex items-center
          `}>
            <div className='pl-3 text-gray-500'>
              <Email />
            </div>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              className='w-full p-3 pl-2 rounded-lg outline-none'
              aria-invalid={errors.email ? 'true' : 'false'}
            />
          </div>
          {errors.email && (
            <p className='text-red-500 text-sm mt-2 pl-2'>{errors.email}</p>
          )}

          {/* Password Input */}
          <div className={`
            relative
            border 
            ${errors.password ? 'border-red-500' : 'border-gray-300 focus-within:border-blue-500'}
            rounded-lg 
            transition-colors 
            duration-300
            flex items-center
          `}>
            <div className='pl-3 text-gray-500'>
              <Https />
            </div>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              className='w-full p-3 pl-2 rounded-lg outline-none'
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='absolute right-3 text-gray-500 hover:text-gray-700'
              aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            >
              {isPasswordVisible ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && (
            <p className='text-red-500 text-sm -mt-2 pl-2'>{errors.password}</p>
          )}

          {/* Login Button */}
          <button
            type='submit'
            className='w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-300 ease-in-out'
          >
            {
              !loading ? (
                'Login'
              ): <PulseLoader />
            }
           
          </button>
        </form>

        {/* Footer Links */}
        <div className='text-center mt-6 space-y-3'>
          <Link 
            to='/forgot-password' 
            className='text-blue-600 hover:underline text-sm block'
          >
            Forgot Password?
          </Link>

          <div className='flex items-center justify-center space-x-2'>
            <div className='h-px w-16 bg-gray-300'></div>
            <span className='text-gray-500 text-sm'>OR</span>
            <div className='h-px w-16 bg-gray-300'></div>
          </div>

          <p className='text-sm text-gray-600'>
            Don't have an account? 
            <button className='text-blue-600 hover:underline ml-1' onClick={()=>{
              setShowLogin(false);
              setShowSignUp(true);
            }}>
            Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;