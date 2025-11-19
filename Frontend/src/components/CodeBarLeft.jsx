import { useContext, useState } from 'react';
import { Sun, Moon, MoreVertical } from 'lucide-react';
import { languages } from '../assets/assets';
import getFileExtension from '../utils/getFileExtension';
import { codeContext } from '../context/CodeContextProvider';

const CodeBarLeft = () => {
  const { lang, setLang, theme, setTheme, localCode, setLocalCode } = useContext(codeContext);

  const [fileName, setFileName] = useState('my_code');
  const [threeDotState, setThreeDotState] = useState({ threeState: false });

  const handleLanguageChange = (e) => setLang(e.target.value);
  const handleThemeOfEditor = () => setTheme((prev) => (prev === 'vs-dark' ? 'light' : 'vs-dark'));

  const handleCopyCode = () => {
    navigator.clipboard.writeText(localCode).catch(() => {});
    setThreeDotState((prev) => ({ ...prev, threeState: false }));
  };

  const handleClearCode = () => {
    setLocalCode('');
    setThreeDotState((prev) => ({ ...prev, threeState: false }));
  };

  return (
    <div className='flex flex-wrap items-center gap-2'>
      <input
        className='w-40 px-3 py-1.5 text-sm bg-white border border-green-300 focus:outline-none focus:border-green-600'
        type='text'
        value={`${fileName}${getFileExtension(lang)}`}
        onChange={(e) => setFileName(e.target.value)}
        placeholder='File name'
      />
      <select
        className='px-3 py-1.5 text-sm bg-white border border-green-300 cursor-pointer focus:outline-none focus:border-green-600'
        onChange={handleLanguageChange}
        value={lang}
      >
        {languages.map((l) => (
          <option key={l.value} value={l.value}>
            {l.label}
          </option>
        ))}
      </select>
      <button
        className='p-1.5 bg-white hover:bg-green-50 border border-green-300 transition-colors'
        onClick={handleThemeOfEditor}
        title={theme === 'vs-dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {theme === 'vs-dark' ? <Sun size={18} className='text-yellow-500' /> : <Moon size={18} className='text-blue-600' />}
      </button>

      <div className='relative'>
        <button
          onClick={() => setThreeDotState((prev) => ({ ...prev, threeState: !prev.threeState }))}
          className='p-1.5 bg-white hover:bg-green-50 border border-green-300 transition-colors'
          title='More options'
        >
          <MoreVertical size={18} className='text-gray-600' />
        </button>
        {threeDotState.threeState && (
          <div className='absolute z-20 top-full mt-1 left-0 min-w-[140px] bg-white border border-green-200 overflow-hidden'>
            <button onClick={handleClearCode} className='w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-green-700 hover:text-white transition-colors'>
              Clear Code
            </button>
            <button onClick={handleCopyCode} className='w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-green-700 hover:text-white transition-colors'>
              Copy Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeBarLeft;
