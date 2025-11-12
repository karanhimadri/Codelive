import CodeBar from '../components/CodeBar';
import MonacoEditor from '../components/MonacoEditor';
import ChatBox from '../components/ChatBox';

const CodeSpace = () => {
  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Main Layout */}
      <CodeBar />
      <div className="grid grid-cols-1 sm:grid-cols-[70%_30%] gap-1 border p-2 flex-1">
        <div><MonacoEditor /></div>
        <div className="hidden sm:block"><ChatBox /></div>
      </div>
    </div>
  );
};

export default CodeSpace;
