import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFilterUsers } from '../redux/slices/userSlice';

const SearchFilters = () => {
    const dispatch=useDispatch();
    const [course,setCourse]=useState('All');
    const [location,setLocation]=useState('All');
    const [costRange,setCostRange]=useState('All');
    const {users,filteredUsers}=useSelector(store=>store.user);

    const handleFilter=()=>{
        try {
            const filteredUser=users.filter((user)=>{
                const matchCourse= course === 'All' || user?.profile?.course?.includes(course);
                const matchLocation= location === 'All' || user?.location === location;
                // const matchCostRange= costRange === 'All' || user?.costRange === location;
                return matchCourse && matchLocation;

            });
            console.log("filteredUser",filteredUser)

            dispatch(addFilterUsers(filteredUser));

            console.log("course location price",course,location,costRange)
        } catch (error) {
            console.log("handleFilter error")
        }
    }

    const handleChange=(e)=>{
        let searchVal=e.target.value;
        if(!searchVal){
            return dispatch(addFilterUsers(users));
        }
        const searchUsers=users.filter((user)=>user?.name?.includes(searchVal) || user?.profile?.location?.includes(searchVal) || user?.profile?.bio?.includes(searchVal));
        return dispatch(addFilterUsers(searchUsers));

    }

    return (
        <div className='w-full bg-white shadow-md mb-2 py-5 px-4 rounded-lg'>
            <form className='w-full flex max-[300px]:flex-col  gap-2 sm:gap-20 py-2'>
                <input onChange={handleChange} type='text' placeholder='search educators, courses, skills...' className='flex-1 outline-blue-500 border border-gray-300 rounded-lg px-1 py-2 text-sm' />
                <button type='submit' className='py-1 px-2 sm:py-2 sm:px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg'>search</button>
            </form>
            <div>
                <h1 className='text-lg ms:text-xl font-bold'>Filters</h1>
                <div className='flex flex-col sm:flex-row gap-2'>
                <select onChange={(e)=>setCourse(e.target.value)} className='p-2 border border-gray-300 text-sm outline-blue-400'>
                    {/* <option value="">Select Course Type</option> */}
                <option value="All">All Courses</option>
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
                <select onChange={(e)=>setLocation(e.target.value)} className='p-2 border border-gray-300 text-sm outline-blue-400'>
                    <option value="All">All Location</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Offline">Offline</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Meerut">Meerut</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Patna">Patna</option>
                    <option value="Patna">Other</option>
                </select>
                <select onChange={(e)=>setCostRange(e.target.value)} className='p-2 border border-gray-300 text-sm outline-blue-400'>
                    <option value="All">Maximum Budget</option>
                    <option value="1000">1000 Rupees</option>
                    <option value="5000">5000 Rupees</option>
                    <option value="10000">10000 Rupees</option>
                    <option value="15000">15000 Rupees</option>
                    <option value="20000">20000 Rupees</option>
                    <option value="30000">30000 Rupees</option>
                    <option value="40000">40000 Rupees</option>
                    <option value="50000">50000 Rupees</option>
                    <option value="70000">70000 Rupees</option>
                </select>
                <button onClick={handleFilter} className='p-2 text-sm font-semibold text-white rounded-lg bg-blue-500 hover:bg-blue-700'>Apply Filters</button>
                </div>
            </div>
        </div>
    )
}

export default SearchFilters
