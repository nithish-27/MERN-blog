import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";
const socket = io.connect("http://localhost:3001");
function App() {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [MessageReceived, setMessageReceived] = useState("");
  const sendMessage = () => {
    socket.emit("message", { message, room });
  };
  const joinroom = () => {
    socket.emit("join room", { room });
  };
  useEffect(() => {
    socket.on("received_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <div>
      <input
        placeholder="room"
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      />
      <button onClick={joinroom}>Send</button>
      <br></br>
      <input
        placeholder="message..."
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage}>Send</button>
      <h1>{MessageReceived}</h1>
    </div>
  );
}

export default App;
