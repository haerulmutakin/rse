import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { getRoomData } from "_api/Api";
import { format } from "_helpers/Date";
import AppContext from "_context/App.context";
import ProfilePlaceholder from "components/common/ProfilePlaceholder";

const Chat = () => {
    const {user, socket, rooms, setSeen} = useContext(AppContext);
    const navigate = useNavigate();
    const params = useParams();
    const {id} = params;

    const [room, setRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const hadnleBakck = () => {
        navigate(-1)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(message !== '') {
            const payload = {
                room: room._id,
                sender: user._id,
                seen_by: [user._id],
                body: message
            }
            socket.emit('set:message', payload)
            setMessage('')
        }
    }

    const fetchRoomData = async () => {
        const data = await getRoomData(id);
        setRoom(data);
    }

    useEffect(() => {
        fetchRoomData();
    }, [])

    useEffect(() => {
        const currentRoom = rooms.find(item => item.id === id);
        if(currentRoom) {
            setMessages(currentRoom.messages);

            const {unseen_messages} = currentRoom;
            if(unseen_messages.length > 0) {
                setSeen({room_id: currentRoom.id, messageIds: unseen_messages.map(x => x._id) , user_id: user._id});
            }
        }
    }, [rooms])

    const getReceiver = () => {
        if(room) {
            const {roomMembers} = room;
            const filtered = roomMembers.filter(item => item._id !== user._id);
            if(filtered.length === 1) {
                const receiver = filtered[0];
                return `${receiver.firstName} ${receiver.lastName}`
            }
        }
        return ''
    }

    return (
        <Fragment>
            <div className="detail-navbar">
                <div onClick={hadnleBakck}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                <div className="ml-5 mr-3">
                    <ProfilePlaceholder />
                </div>
                <div>{getReceiver()}</div>
            </div>
            <div className="message-container">
                {messages.map((item, index) => (
                    <div key={index} className={`message-item ${item.sender._id === user._id ? 'you' : ''}`}>
                        <div className="message-meta">
                            <div className="body">{item.body}</div>
                            <div className="time">{format(item.createdAt, 'HH:mm')}</div>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="message-form">
                <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Message" />
                <button>
                    <FontAwesomeIcon icon={faAngleDoubleRight} />
                </button>
            </form>
        </Fragment>
     );
}
 
export default Chat;