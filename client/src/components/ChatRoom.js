import { useState } from "react";

const ChatRoom = ({username, room}) => {
    const date = new Date();
    const [message, setMessage] = useState('');
    const [fakeMessage, setFakeMessage] = useState([
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
    ])

    const handleSendMessage = () => {
        if(message !== '') {
            const body = {
                username: username,
                time: `${date.getHours()}:${date.getMinutes()}`,
                body: message
            }
            setFakeMessage((current) => [...current, body]);
            setMessage('')
        }
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
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} 
                    onKeyDown={(e) => {
                        if(e.code === 'Enter') {
                            handleSendMessage()  
                        }
                    }}   
                />
                <button onClick={handleSendMessage}>&#9658;</button>
            </div>
        </div>
     );
}
 
export default ChatRoom;