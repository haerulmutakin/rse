import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import SocketContext from '../_context/SocketContext';
import Api from "../_api/ApiInstance";

const MessageItem = ({item}) => {
    const {onlineUsers, newMessage} = useContext(SocketContext);
    const navigate = useNavigate();
    const [lastMessage, setLastMessage] = useState(null);

    const handleRoomClick = () => {
        navigate(`/room/${item._id}`)
    }

    const isOnline = () => {
        return onlineUsers.includes(item?.receiver?._id)
    }

    const fetchLastMessage = async () => {
        const params = {
            room_id: item._id
        }

        const resp = await Api.get('/last-message', {params: params})
        const {data} = resp;
        if(data) {
            setLastMessage(data);
        }
    }

    useEffect(() => {
        fetchLastMessage();
    }, [])

    useEffect(() => {
        if(newMessage) {
            if(newMessage?.room === item._id) {
                setLastMessage(newMessage)
            }
        }
    }, [newMessage])

    return ( 
        <div onClick={handleRoomClick} key={item._id} className="chat-room d-flex align-center p-5">
            <div className={`profile profile-3 ${isOnline() ? 'online': ''}`}>
                <FontAwesomeIcon icon={faUser} />
            </div>
            <div>
                <div className='user-receiver'>{`${item?.receiver?.firstName} ${item?.receiver?.lastName}`}</div>
                <div className='last-message'>{lastMessage?.body}</div>
            </div>
        </div>
     );
}
 
export default MessageItem;