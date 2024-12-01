import { configureStore } from "@reduxjs/toolkit";
import activePageReduce from "./slices/activPageSlice";
import socketReducer from "./slices/socketSlice";
import userReducer from "./slices/userSlice";

const appStore=configureStore({
     reducer:{
        user:userReducer,
        activePage:activePageReduce,
        socketio:socketReducer
     }
});

export default appStore;