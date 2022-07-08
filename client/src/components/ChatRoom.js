import { useState, useEffect } from "react";

const ChatRoom = ({socket, username, room}) => {
    const date = new Date();
    const [message, setMessage] = useState('');
    const [fakeMessage, setFakeMessage] = useState([])

    const handleSendMessage = async () => {
        if(message !== '') {
            const body = {
                room: room,
                username: username,
                time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                body: message
            }
            await socket.emit('sm', body)
            setFakeMessage((current) => [...current, body]);
            setMessage('')
        }
    }

    useEffect(() => {
        socket.on('rm', (data) => {
            setFakeMessage((current) => [...current, data])
        })
    }, [socket]);

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