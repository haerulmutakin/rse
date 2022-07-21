import {useContext, useEffect, useState, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import SocketContext from '../_context/SocketContext';
import UserContext from '../_context/UserContext';
import Api from '../_api/ApiInstance';
import {format} from '../_helpers/Date';

const Room = () => {
    const {socket, newMessage, userRooms} = useContext(SocketContext)
    const user = useContext(UserContext)
    const navigate = useNavigate();
    const urlparams = useParams();
    const roomId = urlparams['*'].split('/')[1];
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [receiver, setReceiver] = useState('User');

    const handleBack = () => {
        navigate(-1);
    }

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

    const getReceiver = () => {
        if(userRooms.length > 0 ) {
            const roomData = userRooms.find(item => item._id === roomId);
            if(roomData) {
                const {receiver} = roomData;
                const {firstName, lastName} = receiver;
                setReceiver(`${firstName} ${lastName}`)
            }
        }
    }

    useEffect(() => {
        fetchMessage();
    }, [])

    useEffect(() => {
        getReceiver();
    }, [userRooms])

    useEffect(() => {
        if(newMessage) {
            setMessages(old => [...old, newMessage])
        }
    }, [newMessage])
    return ( 
        <Fragment>
            <div className="detail-navbar d-flex align-center">
                <div onClick={handleBack} className='arrow-back mr-10'><FontAwesomeIcon icon={faArrowLeft} /></div>
                <div className='detail-layout-title'>{receiver}</div>
            </div>
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
        </Fragment>
     );
}
 
export default Room;