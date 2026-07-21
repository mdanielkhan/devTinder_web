import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

// Pure UI chat component — no API calls. Messages live in local state
// and are seeded with a small mock conversation so the layout has
// something to render. Swap `sendMessage` for a real API call later.

const CURRENT_USER_ID = "me";

const initialMessages = [
  {
    id: 1,
    senderId: "them",
    text: "Hey! Saw you're into React and distributed systems, that's a great combo.",
    time: "9:41 AM",
  },
  {
    id: 2,
    senderId: "me",
    text: "Thanks! Yeah, been building a matchmaking app for devs actually 👀",
    time: "9:43 AM",
  },
  {
    id: 3,
    senderId: "them",
    text: "No way, what stack are you using?",
    time: "9:43 AM",
  },
  {
    id: 4,
    senderId: "me",
    text: "React 19 + Tailwind v4 + DaisyUI on the front, Node/Express/Mongo on the back.",
    time: "9:45 AM",
  },
];

const otherUser = {
  firstName: "Ayesha",
  lastName: "Khan",
  photoUrl: "",
  status: "Online",
};

const Chat = () => {
  //   const [messages, setMessages] = useState(initialMessages)
  //   const [draft, setDraft] = useState("")
  //   const scrollRef = useRef(null)
  const user = useSelector((store) => store.user);
  const { targetUser } = useParams();
  const {newMessage , SetnewMessage} = useState("")
  const userid = user?._id;

  useEffect(() => {
    if(!userid) return
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName : user.firstName,
      userId: userid,
      targetUserId: targetUser,
    });
    return ()=>{
      socket.disconnect();
    }
  }, [userid,targetUser]);

 
 const sendMEssage = ()=>{
   const socket=createSocketConnection()
   socket.emit("sendmessage",{
    firstName : user.firstName,
      userId: userid,
      targetUserId: targetUser,
      text:newMessage
   })
 }




 return (
  <div className="w-full max-w-md h-[600px] flex flex-col bg-base-200 border border-base-300 rounded-box shadow-2xl shadow-black/40 overflow-hidden">
    {/* Header */}
    <div className="flex items-center gap-3 px-4 py-3 border-b border-base-300">
      <div className="relative shrink-0">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-base-300 border border-base-300 flex items-center justify-center">
          {otherUser.photoUrl ? (
            <img
              src={otherUser.photoUrl}
              alt={otherUser.firstName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm font-semibold text-primary">
              {otherUser.firstName[0]}
            </span>
          )}
        </div>
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-success border-2 border-base-100" />
      </div>

      <div>
        <h2 className="font-semibold">
          {otherUser.firstName} {otherUser.lastName}
        </h2>
        <p className="text-xs text-base-content/50">
          {otherUser.status}
        </p>
      </div>
    </div>

    {/* Messages */}
    <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2">
      {/* Incoming bubble */}
      <div className="chat chat-start">
        <div className="chat-bubble bg-base-300 text-base-content">
          Hey, how's it going?
        </div>
      </div>

      {/* Outgoing bubble */}
      <div className="chat chat-end">
        <div className="chat-bubble chat-bubble-primary">
          Pretty good, working on the chat UI right now.
        </div>
      </div>

      {/* Incoming bubble */}
      <div className="chat chat-start">
        <div className="chat-bubble bg-base-300 text-base-content">
          Nice, looks great so far!
        </div>
      </div>
    </div>

    {/* Message input */}
    <div className="flex items-center gap-2 px-4 py-3 border-t border-base-300">
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 input input-bordered bg-base-100 focus:outline-none"
        value={newMessage}
        onChange={(e)=>SetnewMessage(e.target.value)}
      />
      <button onClick={sendMEssage} className="btn btn-primary btn-circle shrink-0">
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
)};

export default Chat;
