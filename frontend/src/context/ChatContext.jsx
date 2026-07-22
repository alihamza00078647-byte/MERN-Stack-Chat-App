import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  // Active User Id
  const [selectedUser, setSelectedUsers] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});

  const { socket, axios, backendURL, token } = useContext(AuthContext);

  // function to get all users from the sidebar
  const getUsers = async () => {
    try {
      const response = await axios.get(backendURL + "/api/messages/users", {headers: {token}});
      // console.log(response.data.users);
      if (response.data.success) {
        setUsers(response.data.users);
        setUnseenMessages(response.data.unseenMessages);
      }
    } catch (error) {
      toast.error(error.messages);
    }
  };

  // function to get messages for selected users.
  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      toast.error(error.messages);
    }
  };

  // function to send message to selected user
  const sendMessage = async (messageData) => {
    try {
      const { data } = await axios.post(
        `${backendURL}/api/messages/send/${selectedUser._id}`,
        messageData,
      );
      if (data.success) {
        setMessages((prevMsg) => [...prevMsg, data.newMessage]);
      } else {
        res.json(data.message);
      }
    } catch (error) {
      res.json(error.message);
    }
  };

  // function to subscribe messages frl selected user
  const subscribeToMessages = async () => {
    if (!socket) return;
    socket.on("newMessage", () => {
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;
        setMessages((prevMsg) => [...prevMsg, newMessage]);
        axios.put(`${backendURL}/api/messages/mark/${newMessage._id}`);
      } else {
        setUnseenMessages((orevUnseenMsg) => ({
          ...prevUnseenMsg,
          [newMessage.senderId]: prevUnseenMsg[newMessage.senderId]
            ? prevUnseenMsg[newMessage.senderId] + 1
            : 1,
        }));
      }
    });
  };

  // function to Unsubscribe the messages
  const UnsubscribeFromMessages = () => {
    if (socket) {
      socket.off("newMessage");
    }
  };

  useEffect(() => {
    subscribeToMessages();
    return () => UnsubscribeFromMessages();
  }, [socket, selectedUser]);

  const value = {
    messages,
    users,
    selectedUser,
    getUsers,
    setMessages,
    sendMessage,
    setSelectedUsers,
    unseenMessages,
    setUnseenMessages,
  };

  
  return (
    <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
  )
};
