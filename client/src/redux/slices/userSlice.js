import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'user',
    initialState:{
        user:null,
        users:null,
        filteredUsers:[],
        connections:[]
    },
    reducers:{
        addUser:(state,action)=>{
            state.user=action.payload;
        },
        addProfileImage:(state,action)=>{
            state.user.profilePicture=action.payload;
        },
        addUsers:(state,action)=>{
            state.users=action.payload
        },
        addConnections:(state,action)=>{
            state.connections=action.payload;
        },
        pushOneConnection:(state,action)=>{ //push from start
            state.connections.unshift(action.payload);
        },
        addFilterUsers:(state,action)=>{
            state.filteredUsers=action.payload
        },
        upDateOneConnection:(state,action)=>{
            const connection=state.connections.find((item)=>item?._id === action.payload._id);
            if(connection){
                connection.status=action.payload.status;
            }
        }

    }
});

export const {addUser,addUsers,addConnections,pushOneConnection,addFilterUsers,upDateOneConnection,addProfileImage}=userSlice.actions;

export default userSlice.reducer;