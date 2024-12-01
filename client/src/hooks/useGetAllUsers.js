import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addFilterUsers, addUsers } from "../redux/slices/userSlice";

function useGetAllUsers() {
    const dispatch = useDispatch();
    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.get("http://localhost:8080/user/api/allUsers", { withCredentials: true });
                dispatch(addUsers(res.data?.users));
                dispatch(addFilterUsers(res.data?.users));
                console.log(res.data?.users);
            }catch (error) {
            console.log("error:useGetAllUsers");
        }
    }
        getUsers();
}, []);
}

export default useGetAllUsers;