import { useContext, useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import { MonacoBinding } from "y-monaco";
import { codeContext } from "../context/CodeContextProvider";

const MonacoEditor = () => {
  const { lang, theme, yText, yProvider } = useContext(codeContext);
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!yText || !yProvider) {
      return;
    }

    setIsLoading(false);

    let editor = null;
    let monacoBinding = null;

    try {
      const container = document.getElementById("editor");
      if (!container) {
        throw new Error("Editor container not found");
      }

      // Create Monaco Editor
      editor = monaco.editor.create(container, {
        language: lang || "javascript",
        theme: theme || "vs-dark",
        value: "", // initial empty; Yjs will sync actual code
        automaticLayout: true,
        fontSize: 15,
        lineHeight: 25,
        minimap: { enabled: false },
        wordWrap: "on",
        selectOnLineNumbers: true,
        autoIndent: "full",
        formatOnPaste: true,
        formatOnType: true,
        scrollBeyondLastLine: false,
        readOnly: false,
      });

      editorRef.current = editor;

      // Bind Monaco editor with Yjs
      monacoBinding = new MonacoBinding(
        yText,
        editor.getModel(),
        new Set([editor]),
        yProvider.awareness
      );

      // Format on Ctrl+S (with browser prevention)
      const handleSaveShortcut = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "s") {
          e.preventDefault();
          editor.getAction("editor.action.formatDocument")?.run();
        }
      };
      window.addEventListener("keydown", handleSaveShortcut);

      // Cleanup on unmount
      return () => {
        window.removeEventListener("keydown", handleSaveShortcut);
        if (monacoBinding) {
          monacoBinding.destroy();
        }
        if (editor) {
          editor.dispose();
        }
      };
    } catch (err) {
      console.error("❌ Error initializing Monaco Editor:", err);
      setError(err.message);
    }
  }, [yText, yProvider, lang, theme]);

  if (error) {
    return (
      <div style={{ height: "583px", width: "100%", padding: "20px", background: "#1e1e1e", color: "#ff6b6b" }}>
        <h3>Error loading editor:</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (isLoading && (!yText || !yProvider)) {
    return (
      <div style={{ height: "583px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1e1e1e", color: "#fff" }}>
        <div>
          <p>⏳ Editor is ready..</p>
          <p style={{ fontSize: "12px", opacity: 0.7 }}>Please create or join a room.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-green-200" style={{ width: "100%" }}>
      <div id="editor" ref={containerRef} style={{ height: "583px", width: "100%" }} />
    </div>
  );
};

export default MonacoEditor;
