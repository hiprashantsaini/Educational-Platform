import { createSlice } from "@reduxjs/toolkit";

const socketSlice=createSlice({
    name:"socketio",
    initialState:{
        socket:null
    },
    reducers:{
        addSocket:(state,action)=>{
            state.socket=action.payload;
        }
    }
});


export const {addSocket}=socketSlice.actions;

export default socketSlice.reducer;