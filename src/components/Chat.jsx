import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/contants";

const Chat = () => {
  const user = useSelector((store) => store.user);
  const { targetUser } = useParams();

  const [newMessage, SetnewMessage] = useState("");
  const [messsage, Setmessage] = useState([]);
  const [targetUserData, setTargetUserData] = useState();

  const userid = user?._id;

  // Persist the socket instance across renders without causing re-renders.
  // Created once (in the effect below) and reused every time we send a message.
  const socketRef = useRef(null);

  // Handle to the empty div at the bottom of the message list, so we can
  // call scrollIntoView() on it whenever a new message arrives.
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!userid) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId: userid,
      targetUserId: targetUser,
    });

    socket.on("messageReceived", ({ firstName, text, userId }) => {
      Setmessage((prev) => [...prev, { firstName, text, userId }]);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userid, targetUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messsage]);

  const sendMEssage = () => {
    if (!newMessage.trim() || !socketRef.current) return;

    socketRef.current.emit("sendmessage", {
      firstName: user.firstName,
      userId: userid,
      targetUserId: targetUser,
      text: newMessage,
    });

   

    SetnewMessage("");
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/" + targetUser, {
          withCredentials: true,
        });

        setTargetUserData({
          firstName: res.data.data.firstName,
          lastName: res.data.data.lastName,
          photoUrl: res.data.data.photoUrl,
          status: res.data.data.status,
        });
      } catch (error) {
        console.error("Failed to fetch target user:", error);
      }
    };

    if (targetUser) {
      getUser();
    }
  }, [targetUser]);


const fetchMessages = async () => {
  try {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUser, {
      withCredentials: true,
    });
    const formattedMessages = chat.data.messages.map((msg) => ({
      firstName: msg.senderId?.firstName,
      text: msg.text,
      userId: msg.senderId?._id,
    }));
    Setmessage(formattedMessages);
  } catch (error) {
    console.error("Failed to fetch messages:", error);
  }
};

useEffect(()=>{
  fetchMessages()
},[])


  if (!targetUserData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-md h-[600px] flex flex-col bg-base-200 border border-base-300 rounded-box shadow-2xl shadow-black/40 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-base-300">
        <div className="relative shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-base-300 border border-base-300 flex items-center justify-center">
            {targetUserData.photoUrl ? (
              <img
                src={targetUserData.photoUrl}
                alt={targetUserData.firstName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-sm font-semibold text-primary">
                {targetUserData.firstName}
              </span>
            )}
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-success border-2 border-base-100" />
        </div>

        <div>
          <h2 className="font-semibold">
            {targetUserData.firstName} {targetUserData.lastName}
          </h2>
          <p className="text-xs text-base-content/50">{targetUserData.status}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2">
        {messsage.map((msg, i) => (
          <div
            key={i}
            className={`chat ${msg.userId === userid ? "chat-end" : "chat-start"}`}
          >
            <div
              className={`chat-bubble ${
                msg.userId === userid
                  ? "chat-bubble-primary"
                  : "bg-base-300 text-base-content"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-base-300">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 input input-bordered bg-base-100 focus:outline-none"
          value={newMessage}
          onChange={(e) => SetnewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMEssage()}
        />
        <button
          onClick={sendMEssage}
          className="btn btn-primary btn-circle shrink-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chat;