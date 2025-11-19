import { useContext, useState } from 'react';
import { Sparkles } from 'lucide-react';
import * as monaco from 'monaco-editor';
import { toast } from 'react-toastify';
import { useAI } from '../context/AiContext';
import { codeContext } from '../context/CodeContextProvider';

const CodeBarAI = () => {
  const { generateCode } = useAI();
  const { yText, editorInstance, setLocalCode } = useContext(codeContext);

  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) {
      toast.warning('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    try {
      const generatedCode = await generateCode(aiPrompt);

      if (generatedCode) {
        const formattedCode = generatedCode.replace(/\\n/g, '\n');

        if (editorInstance) {
          const position = editorInstance.getPosition();
          const range = new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column);
          editorInstance.executeEdits('ai-generation', [
            {
              range,
              text: formattedCode,
            },
          ]);
          const lines = formattedCode.split('\n');
          const lastLine = position.lineNumber + lines.length - 1;
          const lastColumn = lines.length === 1 ? position.column + formattedCode.length : lines[lines.length - 1].length + 1;
          editorInstance.setPosition({ lineNumber: lastLine, column: lastColumn });
          editorInstance.focus();
        } else if (yText) {
          yText.delete(0, yText.length);
          yText.insert(0, formattedCode);
        } else {
          setLocalCode(formattedCode);
        }

        toast.success('Code generated successfully!');
        setAiPrompt('');
      } else {
        toast.error('Failed to generate code. Please try again.');
      }
    } catch (error) {
      console.error('AI Generation Error:', error);
      toast.error('An error occurred while generating code.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className='flex items-center gap-2'>
      <input
        className='w-72 px-3 py-1.5 text-sm bg-white border border-green-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-green-600'
        type='text'
        value={aiPrompt}
        onChange={(e) => setAiPrompt(e.target.value)}
        placeholder='Describe code to generate...'
        disabled={isGenerating}
      />
      <button
        className='px-4 py-1.5 text-sm font-medium bg-white text-green-700 border border-green-700 hover:bg-green-800 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5'
        onClick={handleAIGenerate}
        disabled={isGenerating}
        title='Generate code with AI'
      >
        <Sparkles size={16} className={isGenerating ? 'animate-pulse' : ''} />
        {isGenerating ? 'Generating...' : 'Generate'}
      </button>
    </div>
  );
};

export default CodeBarAI;
