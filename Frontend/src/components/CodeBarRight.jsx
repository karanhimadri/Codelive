import { useContext, useEffect, useState } from 'react';
import { Copy, Check, X, LogOut, Users, MessageSquare } from 'lucide-react';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { codeContext } from '../context/CodeContextProvider';
import generateRoomId from '../utils/generateRoomID';
import { authContext } from '../context/AuthContextProvider';

const CodeBarRight = ({ onToggleChat, isChatOpen }) => {
  const { totalUser, handleRoomCreation, handleRoomJoining, handleRoomLeaving, getAllUsersByRoomId, userLists, connctionMsg } = useContext(codeContext);
  const { user } = useContext(authContext);

  const [copied, setCopied] = useState(false);
  const [roomsCode, setRoomsCode] = useState({ joinRoomCode: '', createRoomCode: '' });
  const [roomStates, setRoomStates] = useState({ createRoomState: false, joinRoomState: false, divState: false, isUserJoined: false });
  const [showJoinedUsers, setShowJoinedUsers] = useState(false);
  const [loading, setLoading] = useState({ createRoomLoading: false, joinRoomLoading: false });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const filtered = userLists.users.filter((u) => u.name !== userLists.creator);
    setUsers(filtered);
  }, [userLists]);

  useEffect(() => {
    if (connctionMsg?.successMsg) toast.success(connctionMsg.successMsg);
  }, [connctionMsg?.successMsg]);

  useEffect(() => {
    if (connctionMsg?.errorMsg) toast.error(connctionMsg?.errorMsg);
  }, [connctionMsg?.errorMsg]);

  const showAllJoinedUsers = () => {
    getAllUsersByRoomId(roomsCode.joinRoomCode);
    setShowJoinedUsers((prev) => !prev);
  };

  const handleOnClickCreateRoom = async () => {
    if (roomsCode.createRoomCode.trim() === '') {
      const roomID = generateRoomId();
      setLoading((prev) => ({ ...prev, createRoomLoading: true }));
      const res = await handleRoomCreation(roomID);
      if (res) {
        setRoomStates((prev) => ({ ...prev, createRoomState: true, divState: true, joinRoomState: false }));
        setRoomsCode((prev) => ({ ...prev, createRoomCode: roomID }));
        setLoading((prev) => ({ ...prev, createRoomLoading: false }));
      } else {
        toast.warn('Unable to create room..');
        setLoading((prev) => ({ ...prev, createRoomLoading: false }));
      }
      return;
    } else {
      setRoomStates((prev) => ({ ...prev, createRoomState: true, divState: true, joinRoomState: false }));
    }
    toast.warn('Room has been created.');
    setLoading((prev) => ({ ...prev, createRoomLoading: false }));
  };

  const handleOnClickLeavingRoom = () => {
    handleRoomLeaving(roomsCode.joinRoomCode);
    setRoomsCode({ joinRoomCode: '', createRoomCode: '' });
    setRoomStates((prev) => ({ ...prev, isUserJoined: false }));
    setShowJoinedUsers(false);
  };

  const handleCopy = () => {
    if (!navigator.clipboard) {
      toast.error('Please manually copy the code');
      return;
    }
    navigator.clipboard
      .writeText(roomsCode.createRoomCode.trim())
      .then(() => setCopied(true))
      .catch(() => setCopied(false));
    setTimeout(() => setCopied(false), 1500);
  };

  const handleJoinRoomCode = async () => {
    if (!/^\d{6}$/.test(roomsCode.joinRoomCode.trim())) {
      toast.error('Invalid Code.');
      return;
    }

    setLoading((prev) => ({ ...prev, joinRoomLoading: true }));
    const res = await handleRoomJoining(roomsCode.joinRoomCode);
    if (res) {
      setRoomStates((prev) => ({ ...prev, isUserJoined: true, divState: false }));
      setLoading((prev) => ({ ...prev, joinRoomLoading: false }));
      return;
    }
    setLoading((prev) => ({ ...prev, joinRoomLoading: false }));
    toast.error('Unable to join room');
    setRoomsCode((prev) => ({ ...prev, joinRoomCode: '' }));
  };

  return (
    <div className='flex flex-col items-end gap-2 relative'>
      <div className='flex gap-2'>
        {!roomStates.isUserJoined ? (
          <div className='flex gap-2'>
            <button
              className='px-4 py-1.5 text-sm font-medium text-green-800 border border-green-700 hover:bg-green-700 hover:text-white transition-colors'
              onClick={handleOnClickCreateRoom}
            >
              {loading.createRoomLoading ? 'Creating...' : 'Create Room'}
            </button>
            <button
              className='px-4 py-1.5 text-sm font-medium bg-white text-green-800 border border-green-300 hover:bg-green-50 transition-colors'
              onClick={() =>
                setRoomStates((prev) => ({
                  ...prev,
                  createRoomState: false,
                  divState: true,
                  joinRoomState: true,
                }))
              }
            >
              Join Room
            </button>
          </div>
        ) : (
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-3 px-3 py-1.5 bg-white border border-green-200'>
              <video className='w-5' autoPlay muted loop>
                <source src={assets.LIVE_video} type='video/mp4' />
              </video>
              <p className='text-sm text-gray-700'>
                Room: <span className='font-semibold text-green-700'>{roomsCode.joinRoomCode}</span>
              </p>
              <button onClick={() => showAllJoinedUsers()} className='flex items-center gap-1 text-sm hover:opacity-80 transition' title='View joined users'>
                <Users size={18} className='text-green-700' />
                <span className='font-medium text-gray-700'>{totalUser}</span>
              </button>
            </div>
            <button onClick={handleOnClickLeavingRoom} className='p-1.5 bg-red-500 text-white hover:bg-red-600 border border-red-400 transition-colors' title='Leave Room'>
              <LogOut size={18} />
            </button>
          </div>
        )}
        <button
          className={`p-1.5 border border-green-300 transition-colors ${isChatOpen ? 'bg-green-700 hover:bg-green-900' : 'bg-green-50 hover:bg-green-100'}`}
          title='Messages'
          onClick={onToggleChat}
          aria-label='Toggle chat panel'
        >
          <MessageSquare size={18} className={`${isChatOpen ? 'text-white' : 'text-green-700'}`} />
        </button>
      </div>

      {roomStates.divState && (
        <div className='absolute top-[110%] right-0 w-80 bg-white border border-green-200 z-50'>
          <div className='bg-green-50 px-4 py-3 border-b border-green-200'>
            <div className='flex justify-between items-center'>
              <p className='text-sm font-medium text-gray-700'>{roomStates.createRoomState ? 'Share Room Code' : 'Join a Room'}</p>
              <button onClick={() => setRoomStates((prev) => ({ ...prev, divState: false }))} className='text-gray-600 hover:text-green-700 transition-colors'>
                <X size={18} />
              </button>
            </div>
            <p className='text-xs text-gray-600 mt-1'>{roomStates.createRoomState ? 'Share this code with your team' : 'Enter the 6-digit room code'}</p>
          </div>

          <div className='px-4 py-3'>
            {roomStates.createRoomState && (
              <div className='flex items-center gap-2'>
                <input readOnly className='flex-1 border border-green-300 px-3 py-2 bg-gray-50 text-gray-800 font-mono text-sm focus:outline-none' value={roomsCode.createRoomCode} />
                <button onClick={handleCopy} className={`p-2 border transition-colors ${copied ? 'border-green-700 bg-green-700 text-white' : 'border-green-700 text-green-800 hover:bg-green-700 hover:text-white'}`} title={copied ? 'Copied' : 'Copy code'}>
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            )}
            {roomStates.joinRoomState && (
              <div className='flex items-center gap-2'>
                <input
                  className='flex-1 border border-green-300 px-3 py-2 focus:outline-none focus:border-green-600 text-sm'
                  value={roomsCode.joinRoomCode}
                  onChange={(e) => setRoomsCode((prev) => ({ ...prev, joinRoomCode: e.target.value }))}
                  placeholder='Enter 6-digit code'
                  maxLength={6}
                />
                <button onClick={handleJoinRoomCode} className='px-4 py-2 border border-green-700 text-green-800 hover:bg-green-700 hover:text-white transition-colors text-sm font-medium'>
                  {loading.joinRoomLoading ? 'Joining...' : 'Join'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {user && showJoinedUsers && (
        <div className='absolute top-[115%] right-0 w-80 bg-white border border-green-200 z-50'>
          <div className='bg-green-50 px-4 py-3 border-b border-green-200'>
            <div className='flex justify-between items-center'>
              <p className='text-sm font-semibold text-gray-900'>Active Users</p>
              <button onClick={() => setShowJoinedUsers(false)} className='text-gray-600 hover:text-green-700 transition-colors'>
                <X size={18} />
              </button>
            </div>
          </div>

          <ul className='max-h-60 overflow-y-auto p-3 space-y-1'>
            <li className='flex justify-between items-center px-3 py-2 text-sm bg-yellow-50 border border-yellow-300'>
              <span className='font-semibold text-yellow-800 flex items-center gap-1'>
                <span className='text-base'>👑</span> {userLists.creator}
              </span>
              <span className='text-xs text-yellow-700 font-medium'>{userLists.created_at}</span>
            </li>

            {users.map((u, i) => (
              <li key={i} className='flex justify-between items-center px-3 py-2 text-sm bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-300 transition-colors'>
                <span className='text-gray-800'>{u.name}</span>
                <span className='text-xs text-gray-500'>{u.joined_at}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CodeBarRight;
