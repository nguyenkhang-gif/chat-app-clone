import { useAuthContext } from "../../contexts/AuthContext.jsx";
import useConversation from "../../zustand/useConversation.js";
const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      {/* ========START OF AVATAR CONTAINER===== */}
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="user avatar" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 item-center">
        {message.createdAt}
      </div>
    </div>
  );
};

export default Message;

// starter code
// const Message = () => {
//   return (
//     <div className="chat chat-end">
//       {/* ========START OF AVATAR CONTAINER===== */}
//       <div className="chat-image avatar">
//         <div className="w-10 rounded-full">
//           <img
//             src="https://avatar.iran.liara.run/public/boy"
//             alt="user avatar"
//           />
//         </div>
//       </div>
//       <div className={"chat-bubble text-white bg-blue-500"}>
//         Hi! this should be a message
//       </div>
//       <div className="chat-footer opacity-50 text-xs flex gap-1 item-center">
//         12:42
//       </div>
//     </div>
//   );
// };

// export default Message;
