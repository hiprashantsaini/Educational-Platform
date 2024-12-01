import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slices/userSlice";

function useGetUserData() {
    const dispatch = useDispatch();
    useEffect(() => {
        const getUserData = async () => {
            try {
                const res = await axios.get("http://localhost:8080/user/api/profile", { withCredentials: true });
                dispatch(addUser(res.data?.user));
            }catch (error) {
            console.log("error:useGetUserData");
        }
    }
        getUserData();
}, []);
}

export default useGetUserData;