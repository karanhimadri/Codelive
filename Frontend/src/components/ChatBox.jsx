import React, { useContext, useEffect, useRef, useState } from "react";
import { codeContext } from "../context/CodeContextProvider";
import { toast } from "react-toastify";
import { Send as SendIcon } from "lucide-react";
import { authContext } from "../context/AuthContextProvider";

const ChatBox = () => {
  const { theme, handleLocalMessageToServer, setUserMessages, userMessages } = useContext(codeContext)
  const { user, setLoginState, setSignupState } = useContext(authContext)
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
    <div className={`w-full h-[583px] flex flex-col justify-end relative overflow-hidden border ${theme === "light" ? "bg-green-50 border-green-200" : "bg-[#0b141a] border-[#2a3942]"}`}>
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
                className={`px-3 py-2 max-w-[75%] break-words border text-sm ${item.local === 1
                  ? "bg-green-700 border-green-700 text-white"
                  : theme === 'light' ? "bg-white border-green-200 text-gray-800" : "bg-[#202c33] border-[#2a3942] text-gray-100"
                  }`}
              >
                {item.local !== 1 && (
                  <div className={`text-xs font-medium mb-1 ${theme === 'light' ? 'text-green-700' : 'text-green-300'}`}>
                    {item.sender}
                  </div>
                )}
                <div className="leading-relaxed">
                  {item.msg}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Decorative gradient removed when authenticated to eliminate blur */}

      {/* Chat Input Box */}
      <div className={`w-full flex items-center gap-2 px-3 py-3 flex-shrink-0 relative z-20 border-t ${user
        ? (theme === "light" ? "bg-white border-green-200" : "bg-[#202c33] border-[#2a3942]")
        : (theme === "light" ? "bg-white/70 border-green-200 backdrop-blur-md" : "bg-[#202c33]/60 border-[#2a3942] backdrop-blur-md")}`}>
        <input
          type="text"
          disabled={!user}
          className={`flex-grow text-sm px-3 py-2 focus:outline-none caret-green-600 placeholder-gray-500 rounded-sm border focus:border-green-600 ${theme === "light" ? "text-gray-800 bg-white/70 border-green-300" : "text-gray-100 bg-[#2a3942]/60 border-[#2a3942] placeholder-gray-400"} ${!user ? 'opacity-60 cursor-not-allowed' : ''}`}
          placeholder="Type a message..."
          value={newtext}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          disabled={!user}
          className={`w-10 h-10 rounded-full border transition-colors flex-shrink-0 flex items-center justify-center ${theme === 'light' ? 'border-green-700 text-green-800 hover:bg-green-700 hover:text-white bg-white' : 'border-green-500 text-green-300 hover:bg-green-600 hover:text-white bg-[#2a3942]'} ${!user ? 'opacity-60 cursor-not-allowed' : ''}`}
          onClick={handleSendMessageBtn}
          aria-label="Send message"
          title="Send"
        >
          <SendIcon size={18} />
        </button>
      </div>

      {/* Foreground lock overlay to restrict input when not logged in */}
      {!user && (
        <div className="absolute left-0 right-0 bottom-0 z-30">
          <div className={`w-full bg-gradient-to-t ${theme === 'light' ? 'from-white/95' : 'from-[#202c33]/95'} to-transparent backdrop-blur-xl border-t ${theme === 'light' ? 'border-green-200' : 'border-[#2a3942]'} px-4 pt-4 pb-5`}>
            <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
              {/* Row 1: Message centered */}
              <p className={`${theme === 'light' ? 'text-gray-800' : 'text-gray-100'} text-sm sm:text-base font-medium text-center`}>Log in or create an account to send messages.</p>
              {/* Row 2: Buttons centered */}
              <div className="flex items-center gap-3 flex-wrap justify-center">
                <button
                  type="button"
                  onClick={() => { setLoginState(true); setSignupState(false); }}
                  className={`${theme === 'light' ? 'px-5 py-2.5 text-green-800 font-medium border border-green-700 hover:bg-green-700 hover:text-white bg-white/70' : 'px-5 py-2.5 text-green-300 font-medium border border-green-500 hover:bg-green-600 hover:text-white bg-[#2a3942]/70'} transition-colors rounded-sm`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => { setSignupState(true); setLoginState(false); }}
                  className={`${theme === 'light' ? 'px-5 py-2.5 bg-green-700 text-white font-medium border border-green-700 hover:bg-white hover:text-green-800' : 'px-5 py-2.5 bg-green-600 text-white font-medium border border-green-500 hover:bg-transparent hover:text-green-300'} transition-colors rounded-sm`}
                >
                  Create account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
