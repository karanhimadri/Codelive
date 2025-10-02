import { useContext, useEffect, useState } from 'react';
import { assets, languages } from '../assets/assets';
import { Sun, Moon, Copy, X, MoreVertical, LogOut, Users } from 'lucide-react';
import { codeContext } from '../context/CodeContextProvider';
import generateRoomId from '../utils/generateRoomID';
import { toast } from 'react-toastify';

const CodeBar = () => {
  const {
    theme, lang, totalUser, setLang, setTheme, setRoomCode,
    localCode, setLocalCode, connctionMsg,
    handleRoomCreation, handleRoomJoining, handleRoomLeaving, getAllUsersByRoomId, userLists
  } = useContext(codeContext);

  const [fileName, setFileName] = useState("firstProgram.js");
  const [copiedNotify, setCopiedNotify] = useState("");
  const [roomsCode, setRoomsCode] = useState({ joinRoomCode: "", createRoomCode: "" });
  const [roomStates, setRoomStates] = useState({ createRoomState: false, joinRoomState: false, divState: false, isUserJoined: false });
  const [threeDotState, setThreeDotState] = useState({ threeState: false });
  const [showJoinedUsers, setShowJoinedUsers] = useState(false);

  // Sample joined users list
  const joinedUsers = ["Alice", "Bob", "Charlie", "David", "Himadri", "Karan", "Allah"];
  const showAllJoinedUsers = () => {
    getAllUsersByRoomId(roomsCode.joinRoomCode);
    setShowJoinedUsers(prev => !prev)
  }

  useEffect(() => {
    if (connctionMsg?.successMsg) toast.success(connctionMsg.successMsg);
  }, [connctionMsg?.successMsg]);

  useEffect(() => {
    if (connctionMsg?.errorMsg) toast.error(connctionMsg?.errorMsg);
  }, [connctionMsg?.errorMsg]);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const filtered = userLists.users.filter(u => u.name !== userLists.creator);
    setUsers(filtered);
  }, [userLists]);

  const handleOnClickCreateRoom = () => {
    setRoomStates(prev => ({ ...prev, createRoomState: true, divState: true, joinRoomState: false }));
    if (roomsCode.createRoomCode.trim() === "") {
      const roomID = generateRoomId();
      handleRoomCreation(roomID);
      setRoomsCode(prev => ({ ...prev, createRoomCode: roomID }));
    }
  };

  const handleOnClickLeavingRoom = () => {
    handleRoomLeaving(roomsCode.joinRoomCode);
    setRoomsCode({ joinRoomCode: "", createRoomCode: "" });
    setRoomStates(prev => ({ ...prev, isUserJoined: false }));
    setShowJoinedUsers(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(localCode).catch(() => { });
    setThreeDotState(prev => ({ ...prev, threeState: false }));
  };

  const handleClearCode = () => {
    setLocalCode("");
    setThreeDotState(prev => ({ ...prev, threeState: false }));
  };

  const handleCopy = () => {
    if (!navigator.clipboard) {
      toast.error("Please manually copy the code");
      return;
    }
    navigator.clipboard.writeText(roomsCode.createRoomCode.trim())
      .then(() => setCopiedNotify("Copied."))
      .catch(() => setCopiedNotify("Failed to copy."));
    setTimeout(() => setCopiedNotify(""), 3000);
  };

  const handleLanguageChange = (e) => setLang(e.target.value);

  const handleThemeOfEditor = () => {
    setTheme(prev => prev === "vs-dark" ? "light" : "vs-dark");
  };

  const handleJoinRoomCode = () => {
    if (!/^\d{6}$/.test(roomsCode.joinRoomCode.trim())) {
      toast.error("Invalid Code.");
      return;
    }
    handleRoomJoining(roomsCode.joinRoomCode);
    setRoomCode(roomsCode.joinRoomCode);
    setRoomStates(prev => ({ ...prev, isUserJoined: true, divState: false }));
  };

  return (
    <div className='w-full flex flex-wrap justify-between items-center bg-gradient-to-r from-blue-600 to-blue-500 py-2.5 px-4 md:px-8 shadow-md relative gap-3'>
      {/* Left Section */}
      <div className='flex flex-wrap items-center gap-2'>
        <input
          className='w-40 px-3 py-1.5 text-sm rounded-md bg-white border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition'
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="File name"
        />
        <select
          className='px-3 py-1.5 text-sm rounded-md bg-white border border-blue-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 transition'
          onChange={handleLanguageChange}
          value={lang}>
          {languages.map(lang => (
            <option key={lang.value} value={lang.value}>{lang.label}</option>
          ))}
        </select>
        <button
          className='p-1.5 bg-white rounded-md hover:bg-blue-50 border border-blue-200 transition-all duration-200'
          onClick={handleThemeOfEditor}
          title={theme === "vs-dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}>
          {theme === "vs-dark" ? <Sun size={18} className='text-yellow-500' /> : <Moon size={18} className='text-blue-600' />}
        </button>

        <div className="relative">
          <button onClick={() => setThreeDotState(prev => ({ ...prev, threeState: !prev.threeState }))}
            className="p-1.5 bg-white rounded-md hover:bg-blue-50 border border-blue-200 transition-all duration-200"
            title="More options">
            <MoreVertical size={18} className='text-gray-600' />
          </button>
          {threeDotState.threeState && (
            <div className="absolute z-20 top-full mt-1 left-0 min-w-[120px] bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
              <button onClick={handleClearCode} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-500 hover:text-white transition-colors">Clear Code</button>
              <button onClick={handleCopyCode} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-500 hover:text-white transition-colors">Copy Code</button>
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className='flex flex-col items-end gap-2 relative'>
        {!roomStates.isUserJoined ? (
          <div className='flex gap-2'>
            <button
              className='px-4 py-1.5 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-white hover:text-blue-700 border border-white transition-all duration-200 shadow-sm'
              onClick={handleOnClickCreateRoom}>
              Create Room
            </button>
            <button
              className='px-4 py-1.5 text-sm font-medium bg-white text-blue-700 rounded-md hover:bg-blue-50 border border-blue-200 transition-all duration-200 shadow-sm'
              onClick={() => setRoomStates(prev => ({
                ...prev,
                createRoomState: false,
                divState: true,
                joinRoomState: true
              }))}>
              Join Room
            </button>
          </div>
        ) : (
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-3 px-3 py-1.5 bg-white rounded-md border border-blue-200 shadow-sm'>
              <video className="w-5" autoPlay muted loop>
                <source src={assets.LIVE_video} type="video/mp4" />
              </video>
              <p className='text-sm text-gray-700'>Room: <span className='font-semibold text-blue-700'>{roomsCode.joinRoomCode}</span></p>
              <button onClick={() => showAllJoinedUsers()}
                className='flex items-center gap-1 text-sm hover:opacity-80 transition'
                title="View joined users">
                <Users size={18} className='text-blue-600' />
                <span className='font-medium text-gray-700'>{totalUser}</span>
              </button>
            </div>
            <button
              onClick={handleOnClickLeavingRoom}
              className='p-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 border border-red-400 transition-all duration-200 shadow-sm'
              title="Leave Room">
              <LogOut size={18} />
            </button>
          </div>
        )}

        {/* Room Code Entry Box */}
        {roomStates.divState && (
          <div className='absolute top-[110%] right-0 w-80 bg-white shadow-xl rounded-lg border border-gray-200 z-50 overflow-hidden'>
            <div className='bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-3 border-b border-gray-200'>
              <div className='flex justify-between items-center'>
                <p className='text-sm font-medium text-gray-700'>
                  {roomStates.createRoomState ? "Share Room Code" : "Join a Room"}
                </p>
                <button
                  onClick={() => setRoomStates(prev => ({ ...prev, divState: false }))}
                  className='text-gray-500 hover:text-gray-700 transition'>
                  <X size={18} />
                </button>
              </div>
              <p className='text-xs text-gray-600 mt-1'>
                {roomStates.createRoomState
                  ? "Share this code with your team"
                  : "Enter the 6-digit room code"}
              </p>
            </div>

            <div className='px-4 py-3'>
              {roomStates.createRoomState && (
                <div className='flex items-center gap-2'>
                  <input
                    readOnly
                    className='flex-1 border border-gray-300 px-3 py-2 rounded-md bg-gray-50 text-gray-800 font-mono text-sm focus:outline-none'
                    value={roomsCode.createRoomCode}
                  />
                  <button
                    onClick={handleCopy}
                    className='p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200'
                    title="Copy code">
                    <Copy size={16} />
                  </button>
                  {copiedNotify && <span className='text-xs text-green-600 font-medium'>{copiedNotify}</span>}
                </div>
              )}
              {roomStates.joinRoomState && (
                <div className='flex items-center gap-2'>
                  <input
                    className='flex-1 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm'
                    value={roomsCode.joinRoomCode}
                    onChange={(e) => setRoomsCode(prev => ({ ...prev, joinRoomCode: e.target.value }))}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                  />
                  <button
                    onClick={handleJoinRoomCode}
                    className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-200 text-sm font-medium'>
                    Join
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Joined Users Card */}
        {showJoinedUsers && (
          <div className='absolute top-[115%] right-0 w-80 bg-white border border-gray-200 shadow-xl rounded-lg z-50 overflow-hidden'>
            <div className='bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-3 border-b border-gray-200'>
              <div className='flex justify-between items-center'>
                <p className='text-sm font-semibold text-gray-800'>Active Users</p>
                <button
                  onClick={() => setShowJoinedUsers(false)}
                  className='text-gray-500 hover:text-gray-700 transition'>
                  <X size={18} />
                </button>
              </div>
            </div>

            <ul className="max-h-60 overflow-y-auto p-3 space-y-1">
              <li className="flex justify-between items-center px-3 py-2 text-sm rounded-md bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-300 shadow-sm">
                <span className="font-semibold text-yellow-800 flex items-center gap-1">
                  <span className='text-base'>👑</span> {userLists.creator}
                </span>
                <span className="text-xs text-yellow-700 font-medium">{userLists.created_at}</span>
              </li>

              {users.map((user, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center px-3 py-2 text-sm rounded-md bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 transition-colors"
                >
                  <span className='text-gray-800'>{user.name}</span>
                  <span className="text-xs text-gray-500">{user.joined_at}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeBar;
