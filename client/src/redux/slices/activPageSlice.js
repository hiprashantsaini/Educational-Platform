import { createSlice } from "@reduxjs/toolkit";

const activePageSlice=createSlice({
    name:"activePage",
    initialState:{
        page:'home'
    },
    reducers:{
        changePage:(state,action)=>{
            state.page=action.payload;
        }
    }
});

export const {changePage} = activePageSlice.actions;

export default activePageSlice.reducer;