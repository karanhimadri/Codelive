import CodeBarLeft from './CodeBarLeft';
import CodeBarAI from './CodeBarAI';
import CodeBarRight from './CodeBarRight';

const CodeBar = ({ onToggleChat, isChatOpen }) => {
  return (
    <div className='w-full flex flex-wrap justify-between items-center bg-white border-b border-green-200 py-2.5 px-4 md:px-8 relative gap-3'>
      <CodeBarLeft />
      <CodeBarAI />
      <CodeBarRight onToggleChat={onToggleChat} isChatOpen={isChatOpen} />
    </div>
  );
};

export default CodeBar;
