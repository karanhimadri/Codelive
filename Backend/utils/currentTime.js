function getCurrentTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return timeString
}

module.exports = {
  getCurrentTime
}
