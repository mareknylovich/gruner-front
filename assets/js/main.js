document.addEventListener("DOMContentLoaded", () => {
  const socket = io("http://localhost:4000", {
    withCredentials: false,
  });

  socket.emit("PAYMENT_NOTIFICATION", {
    type: "VISIT",
  });
});
