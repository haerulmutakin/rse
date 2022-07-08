import { useEffect, useState } from "react";
import io from 'socket.io-client';
import ChatRoom from "./components/ChatRoom";

const socket = io.connect('http://localhost:3001')

function App() {
  const [showRoom, setShowRoom] = useState(false);
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  

  const handleJoinRoom = async () => {
      if(username !== '' && room !== '') {
        await socket.emit('jr', room);
        setShowRoom(true);
      }
   }

  return (
    <div className="App">
      {showRoom ? <ChatRoom socket={socket} username={username} room={room} /> : (
        <div className="group-form">
          <input 
            type="text" 
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="group"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={handleJoinRoom}>Join Room</button>
        </div>
      )}
    </div>
  );
}

export default App;
