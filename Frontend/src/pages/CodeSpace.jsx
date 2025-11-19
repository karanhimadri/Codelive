import { useState } from 'react';
import CodeBar from '../components/CodeBar';
import MonacoEditor from '../components/MonacoEditor';
import ChatBox from '../components/ChatBox';

const CodeSpace = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const toggleChat = () => setIsChatOpen((prev) => !prev);
  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Main Layout */}
      <CodeBar onToggleChat={toggleChat} isChatOpen={isChatOpen} />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-1 border p-2 flex-1 transition-[grid-template-columns] duration-300"
        style={{ gridTemplateColumns: isChatOpen ? '70% 30%' : '100% 0%' }}
      >
        <div className="min-w-0"><MonacoEditor /></div>
        <div className="hidden sm:block overflow-hidden">
          <div className={`h-full transition-transform duration-300 ${isChatOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
            <ChatBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeSpace;
