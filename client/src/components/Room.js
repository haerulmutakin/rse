import {useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faUser } from '@fortawesome/free-solid-svg-icons';
import SocketContext from '../_context/SocketContext';
import UserContext from '../_context/UserContext';
import Api from '../_api/ApiInstance';
import {format} from '../_helpers/Date';

const Room = () => {
    const {socket, newMessage} = useContext(SocketContext)
    const user = useContext(UserContext)
    const urlparams = useParams();
    const roomId = urlparams['*'].split('/')[2];
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        socket.emit('set:message', {
            room: roomId,
            user: user?._id,
            body: message
        })
    }

    const fetchMessage = async () => {
        const params = {
            room_id: roomId
        }

        const resp = await Api.get('/message', {params: params})
        const {result} = resp.data;
        setMessages(result);
    }

    useEffect(() => {
        fetchMessage();
    }, [])

    useEffect(() => {
        if(newMessage) {
            setMessages(old => [...old, newMessage])
        }
    }, [newMessage])
    return ( 
        <div className='chat-container'>
            <div className='chat-list'>
                {messages.map((item, index) => (
                    <div key={index} className={`chat-window ${item.user?._id === user?._id ? 'you' : ''}`}>
                        <div className="chat-body my-5 p-5 mx-10">
                            <div>{item.body}</div>
                            <div className='chat-meta'>{format(item.createdAt, 'HH:mm')}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='chat-form d-flex align-center'>
                <input onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Message..."/>
                <button onClick={sendMessage} className='d-flex align-center justify-center'><FontAwesomeIcon icon={faAngleDoubleRight} /></button>
            </div>
        </div>
     );
}
 
export default Room;