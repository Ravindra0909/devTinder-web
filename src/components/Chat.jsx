import React, { useState, useEffect, useRef } from "react";
import { Send, User, Info, MoreHorizontal, Shield } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLocation, useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const socketRef = useRef(null);
  const location = useLocation();
  const { onFirstName, onLastName, onPhotoUrl } = location.state || {};
  console.log(onFirstName, onLastName, onPhotoUrl);
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });
    console.log(chat.data.messages);
    const chatMessages = chat?.data?.messages.map((msg) => {
      return {
        text: msg.text,
        senderId: msg.senderId._id,
        timestamp: new Date(msg.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
    });
    setMessages(chatMessages);
  };
  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }

    socketRef.current = createSocketConnection();
    socketRef.current.emit("joinChat", {
      firstName: user?.firstName,
      userId,
      targetUserId,
    });
    socketRef.current.emit("userOnline", userId);

    socketRef.current.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    socketRef.current.on("messageRecieved", ({ firstName, text, senderId }) => {
      console.log(firstName + " " + text);
      setMessages((messages) => [
        ...messages,
        {
          text,
          senderId,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    socketRef.current.emit("sendMessage", {
      firstName: user?.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });

    const newMsg = {
      text: newMessage,

      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // setMessages([...messages, newMsg]);
    setNewMessage("");
  };
  const isOnline = onlineUsers.includes(targetUserId);

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] w-full max-w-5xl mx-auto bg-[#0A0A0B] rounded-[2.5rem] shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10 relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-indigo-500/5 blur-[120px]"></div>
      <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-violet-500/5 blur-[120px]"></div>

      {/* Header */}
      <header className="flex items-center justify-between px-10 py-6 bg-[#111113] border-b border-white/5 relative z-20">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-[#1A1A1E] flex items-center justify-center border border-white/10 shadow-xl">
              {onPhotoUrl ? (
                <img
                  src={onPhotoUrl}
                  alt={onFirstName}
                  className="w-14 h-14 rounded-2xl object-cover"
                />
              ) : (
                <User className="w-7 h-7 text-indigo-400" />
              )}
            </div>

            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#0A0A0B] rounded-full flex items-center justify-center border-2 border-[#111113]">
              <div className="w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,1)]"></div>
            </div>
          </div>

          <div>
            <h1 className="text-white font-bold text-xl">
              {onFirstName} {onLastName}
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400/80">
                Developer Node
              </span>
              <div className="w-1 h-1 rounded-full bg-white/10"></div>
              <span
                className={`text-[12px] font-large ${
                  isOnline ? "text-green-400" : "text-gray-500"
                }`}
              >
                {isOnline ? "online" : "offline"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5">
            <Info size={20} />
          </button>
          <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto p-10 space-y-8 bg-[#0A0A0B]">
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => {
            const isMe = msg.senderId === userId;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                {/* ${isMe ? "items-end" : "items-start"} */}
                <div className={`max-w-[80%] flex flex-col items-end`}>
                  {/* ${
                      isMe
                        ? "bg-indigo-600 text-white rounded-tr-none"
                        : "bg-[#1C1C1F] text-white border border-white/5 rounded-tl-none"
                    } */}
                  <div
                    className={`px-6 py-4 rounded-2xl text-[15px] shadow-lg ${
                      isMe
                        ? "bg-indigo-600 text-white rounded-tr-none"
                        : "bg-[#1C1C1F] text-white border border-white/5 rounded-tl-none"
                    } `}
                  >
                    {msg.text}
                  </div>

                  <span className="text-[10px] mt-2 text-gray-600">
                    {msg.timestamp}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        <div ref={messagesEndRef}></div>
      </div>

      {/* Input */}
      <footer className="p-8 bg-[#111113] border-t border-white/5">
        <form onSubmit={handleSendMessage} className="flex items-center gap-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write a message..."
            className="w-full bg-[#1C1C1F] border border-white/10 focus:border-indigo-500/50 rounded-xl py-4 px-6 text-white placeholder:text-gray-600"
          />

          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="w-14 h-14 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900/50 text-white rounded-xl flex items-center justify-center active:scale-95"
          >
            <Send size={22} />
          </button>
        </form>

        <div className="mt-4 flex justify-center items-center gap-2">
          <Shield className="w-3 h-3 text-gray-700" />
          <span className="text-[9px] uppercase text-gray-700">
            End-to-End Encrypted
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Chat;
