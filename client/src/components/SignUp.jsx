import { Email, Https, LocationCityOutlined } from '@mui/icons-material';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import CloseIcon from '@mui/icons-material/Close';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LightModeIcon from '@mui/icons-material/LightMode';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PulseLoader from "react-spinners/PulseLoader";
import { changePage } from '../redux/slices/activPageSlice';

const SignUp = ({ showSignUp, setShowSignUp, setShowLogin }) => {
    const dispatch=useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        bio: '',
        role: '',
        course: '',
        mode: ''
    });
    const [errors, setErrors] = useState({});
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading,setIsLoading]=useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!formData.location?.trim() || !formData.location) {
            newErrors.location = 'Location is required';
        }

        if (!formData.role) {
            newErrors.role = 'Profile role is required';
        }

        if (formData.role === 'provider') {
            if (!formData.course) {
                newErrors.course = 'Education type is required';
            }
            if (!formData.mode) {
                newErrors.mode = 'Education mode is required';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            if (validateForm()) {
                const res=await axios.post("http://localhost:8080/user/api/register",{...formData},{
                    headers:{
                        "Content-Type":"application/json",
                    },
                    withCredentials:true
                });
                console.log("res signUp :",res);
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    location:'',
                    bio: '',
                    role: '',
                    course: '',
                    mode: ''
                   });
                setShowSignUp(false);
                setShowLogin(true);
                dispatch(changePage('login'))
            } 
        } catch (error) {
            console.log("error :",error);
        }finally{
            setIsLoading(false);
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
                        setShowSignUp(false)
                      }} 
                    className='absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-300'
                    style={{ fontSize: '2rem' }}
                />

                {/* Header */}
                <div className="flex flex-col items-center mb-6">
                    <h1 className='text-xl sm:text-3xl font-bold text-gray-800 mb-2'>Create Account</h1>
                    <p className='text-2sm sm:text-lg text-gray-500 text-center'>Join our community today!</p>
                </div>
                <hr className='mb-1' />

                {/* Form */}
                <div className='h-[60vh] overflow-y-auto'>

                    <form onSubmit={handleSubmit} className='space-y-4'>
                        {/* Name Input */}
                        <div className={`
                              relative
                              border 
                              ${errors.name ? 'border-red-500' : 'border-gray-300'}
                              rounded-lg 
                              transition-colors 
                              duration-300
                              flex items-center
                            `}>
                            <div className='pl-3 text-gray-500'>
                                <PersonIcon />
                            </div>
                            <input
                                type='text'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                placeholder='Enter your name'
                                className='w-full p-3 pl-2 rounded-lg outline-none'
                            />
                        </div>
                        {errors.name && (
                            <p className='text-red-500 text-sm -mt-2 pl-2'>{errors.name}</p>
                        )}

                        {/* Email Input */}
                        <div className={`
                              relative
                              border 
                              ${errors.email ? 'border-red-500' : 'border-gray-300'}
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
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='Enter your email'
                                className='w-full p-3 pl-2 rounded-lg outline-none'
                            />
                        </div>
                        {errors.email && (
                            <p className='text-red-500 text-sm -mt-2 pl-2'>{errors.email}</p>
                        )}

                        {/* Password Input */}
                        <div className={`
                               relative
                               border 
                               ${errors.password ? 'border-red-500' : 'border-gray-300'}
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
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                placeholder='Enter your password'
                                className='w-full p-3 pl-2 rounded-lg outline-none'
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

                            {/* Location Input */}
                            <div className={`
                               relative
                               border 
                               ${errors.location ? 'border-red-500' : 'border-gray-300'}
                               rounded-lg 
                               transition-colors 
                               duration-300
                               flex items-center
                             `}>
                            <div className='pl-3 text-gray-500'>
                                <LocationCityOutlined /> 
                            </div>
                            <select name='location' value={formData.location} onChange={handleChange}  className='w-full p-3 pl-2 rounded-lg outline-none'>
                               <option value="">Select Location</option>
                               <option value="Remote">Remote</option>
                               <option value="Hybrid">Hybrid</option>
                               <option value="Offline">Offline</option>
                               <option value="Delhi">Delhi</option>
                               <option value="Meerut">Meerut</option>
                               <option value="Mumbai">Mumbai</option>
                               <option value="Patna">Patna</option>
                               <option value="Other">Other</option>
                            </select>
                        </div>
                        {errors.location && (
                            <p className='text-red-500 text-sm -mt-2 pl-2'>{errors.location}</p>
                        )}

                        {/* Bio Input */}
                        <div className={`
                             relative
                             border 
                             border-gray-300
                             rounded-lg 
                             transition-colors 
                             duration-300
                             flex items-center
                           `}>
                            <div className='pl-3 text-gray-500'>
                                <AccessibilityIcon />
                            </div>
                            <input
                                type='text'
                                name='bio'
                                value={formData.bio}
                                onChange={handleChange}
                                placeholder='Enter your bio'
                                className='w-full p-3 pl-2 rounded-lg outline-none'
                            />
                        </div>

                        {/* Profile Type Select */}
                        <div className={`
                             relative
                             border 
                             ${errors.role ? 'border-red-500' : 'border-gray-300'}
                             rounded-lg 
                             transition-colors 
                             duration-300
                             flex items-center
                           `}>
                            <div className='pl-3 text-gray-500'>
                                <LibraryBooksIcon />
                            </div>
                            <select
                                name='role'
                                value={formData.role}
                                onChange={handleChange}
                                className='w-full p-3 pl-2 rounded-lg outline-none'
                            >
                                <option value="">Select Your role</option>
                                <option value="seeker">Education Seeker</option>
                                <option value="provider">Education Provider</option>
                            </select>
                        </div>
                        {errors.role && (
                            <p className='text-red-500 text-sm -mt-2 pl-2'>{errors.role}</p>
                        )}

                        {/* Conditional Inputs for Education Provider */}
                        {formData.role === 'provider' && (
                            <>
                                <div className={`
                                      relative
                                      border 
                                      ${errors.course ? 'border-red-500' : 'border-gray-300'}
                                      rounded-lg 
                                      transition-colors 
                                      duration-300
                                      flex items-center
                                    `}>
                                    <div className='pl-3 text-gray-500'>
                                        <CastForEducationIcon />
                                    </div>
                                    <select
                                        name='course'
                                        value={formData.course}
                                        onChange={handleChange}
                                        className='w-full p-3 pl-2 rounded-lg outline-none max-h-18'
                                    >
                                        <option value="">Select Course</option>
                                        <option value="java">Java</option>
                                        <option value="full-stack">Full Stack Development</option>
                                        <option value="frontend-dev">Frontend Development</option>
                                        <option value="backend-dev">Backend Development</option>
                                        <option value="math">Advanced Mathematics</option>
                                        <option value="network">Computer Networks</option>
                                        <option value="data-science">Data Science</option>
                                        <option value="ml-ai">Machine Learning and AI</option>
                                        <option value="cyber-security">Cyber Security</option>
                                        <option value="cloud-computing">Cloud Computing</option>
                                        <option value="database-design">Database Design</option>
                                        <option value="os">Operating Systems</option>
                                        <option value="dsa">Data Structures and Algorithms</option>
                                        <option value="uiux">UI/UX Design</option>
                                        <option value="game-dev">Game Development</option>
                                        <option value="blockchain">Blockchain Development</option>
                                        <option value="devops">DevOps</option>
                                    </select>
                                </div>
                                {errors.course && (
                                    <p className='text-red-500 text-sm -mt-2 pl-2'>{errors.course}</p>
                                )}
                                <div className={`
                                         relative
                                         border 
                                         ${errors.mode ? 'border-red-500' : 'border-gray-300'}
                                         rounded-lg 
                                         transition-colors 
                                         duration-300
                                         flex items-center
                                       `}>
                                    <div className='pl-3 text-gray-500'>
                                        <LightModeIcon />
                                    </div>
                                    <select
                                        name='mode'
                                        value={formData.mode}
                                        onChange={handleChange}
                                        className='w-full p-3 pl-2 rounded-lg outline-none'
                                    >
                                        <option value="">Mode of Education</option>
                                        <option value="in-person">In-Person</option>
                                        <option value="online">Online</option>
                                        <option value="hybrid">Hybrid</option>
                                    </select>
                                </div>
                                {errors.mode && (
                                    <p className='text-red-500 text-sm -mt-2 pl-2'>{errors.mode}</p>
                                )}
                            </>
                        )}

                        {/* Submit Button */}
                        <button
                            type='submit'
                            className='w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-300 ease-in-out'
                        >
                            {
                               !isLoading ? 'Create Account' :<PulseLoader/>
                            }
                          
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div className='text-center mt-6 space-y-3'>
                        <div className='flex items-center justify-center space-x-2'>
                            <div className='h-px w-16 bg-gray-300'></div>
                            <span className='text-gray-500 text-sm'>OR</span>
                            <div className='h-px w-16 bg-gray-300'></div>
                        </div>

                        <p className='text-sm text-gray-600'>
                            Already have an account?
                            <button className='text-blue-600 hover:underline ml-1' onClick={() => {
                                setShowSignUp(false);
                                setShowLogin(true);
                            }}>
                                Login
                            </button>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SignUp;
