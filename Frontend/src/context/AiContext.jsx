import { createContext, useContext } from "react";

const AiContext = createContext();

export const AiProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  const generateCode = async (prompt) => {
    try {
      const response = await fetch(`${API_URL}/api/ai/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!data.success) {
        console.error("AI Response Error:", data.message);
        return null;
      }

      return data.code;

    } catch (err) {
      console.error("AI Error:", err);
      return null;
    }
  };

  return (
    <AiContext.Provider value={{ generateCode }}>
      {children}
    </AiContext.Provider>
  );
};

export const useAI = () => useContext(AiContext);