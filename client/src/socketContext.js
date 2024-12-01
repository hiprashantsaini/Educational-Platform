import { createContext, useContext } from "react";
import io from "socket.io-client";

const SocketContext=createContext(null);


const SocketProvider=({children})=>{
    const socket=io('http://localhost:8080');
    console.log("Socket Provider works")
    return (
       <SocketContext.Provider value={socket}>
        {children}
       </SocketContext.Provider>
    )
}

export { SocketProvider };

export const useSocket=()=>useContext(SocketContext);