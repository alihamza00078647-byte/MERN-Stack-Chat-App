import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {io} from "socket.io-client";
import { data } from "react-router-dom";


export const AuthContext =  createContext();


const backendURL = import.meta.env.VITE_BACKEND_URL;
axios.default.baseURL = backendURL;


export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userAuth, setUserAuth] = useState(null);
    const [onlineUser, setOnlineUser] = useState([]);
    const [socket, setSocket] = useState(null);

    
    // check if user data is authenticated or if so, set user data and connect socket

    const checkAuth = async () => {

        try {
            const response = await axios.get(backendURL + '/api/auth/check');
            if (response.data.success) {
                setUserAuth(response.data.User);
                connectSocket(response.data.User)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // Login function to handle user authentication and socket connection.
    const Login = async (state, credentials) => {
        try {
            
            //console.log(credentials)
            const {data} = await axios.post(`${backendURL}/api/auth/${state}`, credentials);
            // console.log(data);
            if (data.success) {
                setUserAuth(data.userData);
                connectSocket(data.userData);
                axios.defaults.headers.common['token'] = data.token;
                setToken(data.token);
                localStorage.setItem('token', data.token);
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);            
        }
    }

    // Logout function to handle logout 
    const Logout = async () => {
        localStorage.removeItem('token');
        setToken(null);
        setUserAuth(null);
        setOnlineUser([]);
        axios.defaults.headers.common['token'] = null;
        toast.success('Logout Successfully');
        socket.disconnect();
    }

    // update profile function to handle user profile updates.
    const updateProfile = async (body) => {
        try {
            
            console.log(body)
            const {data} = await axios.post(`${backendURL}/api/auth/update-profile`, {body});
            if (data.success){
                setUserAuth(data.User);
                toast.success("Profile update Successfully");
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }



    // Connect socket function to handle sockets connections and user updates
    const connectSocket = (userData) => {
        if (!userData || socket?.connected) {
            return 
        }
        const newSocket = io(backendURL, {
            query: {
                userId: userData._id
            }
        });

        newSocket.connect();
        setSocket(newSocket);

        newSocket.on("getOnlineUser", (userIds) => {
            setOnlineUser(userIds);
        })
    } 


    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["token"] = token;
        }
        checkAuth();
    }, [])


    const value = {
        axios,
        userAuth,
        onlineUser,
        socket,
        Login,
        Logout,
        updateProfile
    }


    return <AuthContext.Provider  value={value}>
        {children}
    </AuthContext.Provider>
}