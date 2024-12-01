import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addConnections } from "../redux/slices/userSlice";

const useGetAllConnections=()=>{
    const dispatch=useDispatch();
    useEffect(()=>{
        const getConnections=async()=>{
            try {
              const res=await axios.get("http://localhost:8080/user/api/connections",{withCredentials:true});
              console.log("connections :",res);
              dispatch(addConnections(res?.data?.connections));
            } catch (error) {
               console.log("getConnections :",error); 
            }
        }

        getConnections();
    },[]);
};

export default useGetAllConnections;