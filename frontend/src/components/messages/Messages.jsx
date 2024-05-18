import Message from "./Message.jsx";
import useGetMessages from "../../Hooks/useGetMessages.js";
import MessageSkeleton from "../skeleton/MessageSkeleton.jsx";
import { useEffect, useRef } from "react";
import useListenMessages from "../../Hooks/useListenMessages.js";
const Messages = () => {
  const { loading, messages } = useGetMessages();

  useListenMessages();
  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [messages]);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      {loading ? <MessageSkeleton /> : null}

      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start conversation</p>
      )}
    </div>
  );
};

export default Messages;

// // starter code
// import Message from "./Message.jsx";

// const Messages = () => {
//   return (
//     <div className="px-4 flex-1 overflow-auto">
//       <Message />
//       <Message />
//       <Message />
//     </div>
//   );
// };

// export default Messages;
