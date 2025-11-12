const getFileExtension = (language) => {
  switch (language) {
    case "plaintext":
      return ".txt";
    case "javascript":
      return ".js";
    case "python":
      return ".py";
    case "java":
      return ".java";
    case "cpp":
      return ".cpp";
    case "c":
      return ".c";
    case "sql":
      return ".sql";
    default:
      return "";
  }
};

export default getFileExtension;
