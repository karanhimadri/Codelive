import React, { useContext, useEffect, useRef, useState } from "react";
import { codeContext } from "../context/CodeContextProvider";
import { toast } from "react-toastify";

const ChatBox = () => {
  const { theme, handleLocalMessageToServer, setUserMessages, userMessages } = useContext(codeContext)
  const chatContainerRef = useRef(null);
  const [newtext, setNewText] = useState("");

  // Scroll to Bottom when new message is added
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [userMessages]);

  // Handle sending message
  const handleSendMessageBtn = () => {
    if (newtext.trim() === "") {
      toast.warning("Invaild input")
      return
    }
    handleLocalMessageToServer(newtext)
    setUserMessages((prevMsg) => [...prevMsg, { local: 1, msg: newtext }]);
    setNewText("");
  };

  // Handle Enter key for sending message
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessageBtn();
    }
  };

  return (
    <div className={`w-full h-[575px] text-white flex flex-col justify-end relative border border-gray-300 rounded-lg overflow-hidden ${theme === "light" ? "bg-[#e5ddd5]" : "bg-[#0b141a]"}`}>
      {/* Messages Container */}
      <div
        className="flex-1 px-3 py-2 flex flex-col overflow-y-auto scrollbar-hide gap-1"
        ref={chatContainerRef}
      >
        {userMessages.length === 0 ? (
          <p className={`text-center text-sm mt-4 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>No messages yet.</p>
        ) : (
          userMessages.map((item, index) => (
            <div key={index} className={`w-full flex ${item.local === 1 ? "justify-end" : "justify-start"} mb-1`} >
              <div
                className={`px-2.5 py-1.5 rounded-md max-w-[75%] break-words shadow-sm ${item.local === 1
                  ? "bg-[#005c4b] text-white rounded-br-none"
                  : "bg-[#202c33] text-white rounded-bl-none"
                  }`}
              >
                {item.local !== 1 && (
                  <div className="text-xs font-semibold text-[#06cf9c] mb-0.5">
                    {item.sender}
                  </div>
                )}
                <div className="text-sm leading-relaxed">
                  {item.msg}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Chat Input Box */}
      <div className={`w-full flex items-center gap-2 px-2 py-1.5 flex-shrink-0 ${theme === "light" ? "bg-[#f0f0f0]" : "bg-[#202c33]"}`}>
        <input
          type="text"
          className={`flex-grow text-sm px-3 py-2 rounded-full resize-none outline-none ${theme === "light" ? "bg-white text-gray-800" : "bg-[#2a3942] text-white"} focus:outline-none`}
          placeholder="Type a message..."
          value={newtext}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-[#00a884] hover:bg-[#06cf9c] text-white font-semibold w-9 h-9 rounded-full flex items-center justify-center transition duration-200 flex-shrink-0"
          onClick={handleSendMessageBtn}
        >
          <span className="text-base">➤</span>
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
