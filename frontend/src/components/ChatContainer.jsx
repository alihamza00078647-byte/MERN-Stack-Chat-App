import { useContext, useEffect, useRef, useState } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

function ChatContainer() {
  
  const {messages, selectedUser, setMessages, getMessages, setSelectedUser,sendMessage} = useContext(ChatContext)
  const {userAuth, onlineUser} = useContext(AuthContext)
  
  const scrollEnd = useRef();
  const [input, setInput] = useState('');

  // Handle Sending the message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      return null;
    }
    await sendMessage({text: input.trim()});
    setInput('');
  } 

  // handle Sending an image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];

    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select An image file");
      return;
    }
    const reader = new FileReader();
    reader.onloaded = async () => {
      await sendMessage({image: reader.result})
      e.target.value = "";
    }
    reader.readAsDataURL(file);
  }


  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id)
    }
  }, [selectedUser]);


  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return selectedUser ? (
    <div className="h-full overflow-scroll relative backdrop-blur-lg">
      {/* -------------------- Header Part of Chat ------------------ */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img src={selectedUser.profilePic || assets.avatar_icon} className="w-8 rounded-full" alt="" />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser.fullName}
          {onlineUser.includes(selectedUser._id)}<span className="w-2 h-2 rounded-full bg-green-500"></span>
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          className="md:hidden max-w-7"
          alt=""
        />
        <img src={assets.help_icon} className="max-w-5 max-md:hidden" alt="" />
      </div>

      {/*  ------------------- Chat Area ------------ */}
      <div className="flex flex-col p-3 pb-6 overflow-y-scroll h-[calc(100%-120px)]">
        {messagesDummyData.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 justify-end ${msg.senderId !== "680f50e4f10f3cd28382ecf9" && "flex-row-reverse"}`}
          >
            {msg.image ? (
              <img
                src={msg.image}
                alt="image"
                className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8"
              />
            ) : (
              <p
                className={`p-2 max-w-[200px] md:text-sm text-light rounded-lg mb-8 break-all bg-violet-500/50 text-white ${msg.senderId === "680f50e4f10f3cd28382ecf9" ? "rounded-br-none" : "rounded-bl-none"}`}
              >
                {msg.text}
              </p>
            )}
            <div className="text-center text-xs">
              <img
                src={
                  msg.senderId === "680f50e4f10f3cd28382ecf9"
                    ? assets.avatar_icon
                    : assets.profile_martin
                }
                alt=""
                className="w-7 rounded-full"
              />
              <p className="text-gray-500">
                {formatMessageTime(msg.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>
      {/* ------------ Bottom Area To Send Messages ----------------- */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3">
        <div className="flex-1 flex items-center bg-gray-100/12 rounded-full px-3">
          <input 
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => e.key === "Enter" ? handleSendMessage(e) : null }
            type="text"
            placeholder="Send a message"
            className="flex-1 text-sm border-none outline-none text-white p-3 placeholder-gray-400"
          />
          <input
            type="file"
            onChange={handleSendImage}
            className=""
            id="image"
            accept=".png, .jpg, .jpeg"
            hidden
          />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              className="w-5 mr-2 cursor-pointer"
              alt=""
            />
          </label>
        </div>
        <img onClick={handleSendMessage}  src={assets.send_button} className="w-7 cursor-pointer" alt="send" />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
      <img src={assets.logo_icon} className="max-w-16" alt="" />
      <p className="text-lg text-white font-medium">Chat Anytime, Anywhere</p>
    </div>
  );
}

export default ChatContainer;
