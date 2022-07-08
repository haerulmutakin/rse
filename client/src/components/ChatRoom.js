import { useState } from "react";

const ChatRoom = ({username, room}) => {
    const [message, setMessage] = useState();
    const fakeMessage = [
        {
            username: 'takin',
            time: '12:00',
            body: 'Jadinya interview jam berapa mba?'
        },
        {
            username: 'HR One Code',
            time: '12:00',
            body: 'Halo mas, selamat siang'
        },
        {
            username: 'HR One Code',
            time: '12:00',
            body: 'Maaf mas Haerul, untuk interview hari ini di pending ya mas, dikarenakan user kami ada rapat mendadak dengan klient'
        },
        {
            username: 'takin',
            time: '12:00',
            body: 'Maaf gk bisa mba, jumat siang sampai sore ada meeting mingguan sm sprint planning'
        },
    ]

    const handleSendMessage = () => {
        console.log(message)
    }

    return ( 
        <div className="chat-room">
            <div className="chat-header">
                {room}
            </div>
            <span className="chat-body">
                {fakeMessage.map((item, idx) => (
                    <div key={idx} className="message-window" id={username === item.username ? 'you' : 'other'}>
                        <div className="message-item" >
                            <div className="message-author">{item.username === username ? 'Anda' : item.username}</div>
                            <div className="message-body">{item.body}</div>
                            <div className="message-time">{item.time}</div>
                        </div>
                    </div>
                ))}
            </span>
            <div className="chat-footer">
                <input 
                    type="text"
                    placeholder="Type a message"
                    onChange={(e) => setMessage(e.target.value)}    
                />
                <button onClick={handleSendMessage}>&#9658;</button>
            </div>
        </div>
     );
}
 
export default ChatRoom;