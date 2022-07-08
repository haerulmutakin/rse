import { useState } from "react";
import ChatRoom from "./components/ChatRoom";

function App() {
  const [showRoom, setShowRoom] = useState(true);
  const [username, setUsername] = useState('takin');
  const [room, setRoom] = useState('Banu Saleh');

  const handleJoinRoom = () => {
      if(username !== '' && room !== '') {
        setShowRoom(true);
      }
   }

  return (
    <div className="App">
      {showRoom ? <ChatRoom username={username} room={room} /> : (
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
