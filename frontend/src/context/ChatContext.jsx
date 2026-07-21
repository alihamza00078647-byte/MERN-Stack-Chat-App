import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();



export const ChatProvider = ({children}) => {
    
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    // Active User Id
    const [selecedUsers, setSelectedUsers] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});

    const {socket, axios, backendURL} = useContext(AuthContext);
    
    // function to get all users from the sidebar
    const getUsers = async () => {
        try {
            
            const {data} = await axios.get(backendURL + '/api/messages/users');
            console.log(data);
            if (data.success) {
                setUsers(data.users);
                setUnseenMessages(data.unseenMessages);

            }

        } catch (error) {
            toast.error(error.messages);
        }
    }

    // function to get messages for selected users.
    


    const value = {

    }
    
    
    
    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}


