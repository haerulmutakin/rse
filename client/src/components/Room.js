import {useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faUser } from '@fortawesome/free-solid-svg-icons';
import SocketContext from '../_context/SocketContext';
import UserContext from '../_context/UserContext';

const Room = () => {
    const {socket} = useContext(SocketContext)
    const user = useContext(UserContext)
    const urlparams = useParams();
    const roomId = urlparams['*'].split('/')[2];

    const chats = [
        {
            sender: 'haerulmutakin',
            receiver: 'fatinzaida',
            body: 'Halo'
        },
        {
            sender: 'fatinzaida',
            receiver: 'haerulmutakin',
            body: 'Halo juga'
        },{
            sender: 'haerulmutakin',
            receiver: 'fatinzaida',
            body: 'Apa kabar?'
        },{
            sender: 'haerulmutakin',
            receiver: 'fatinzaida',
            body: 'Oh ya, hasil diskusi sama HR kemarin gimana ya?'
        },
        {
            sender: 'fatinzaida',
            receiver: 'haerulmutakin',
            body: 'Katanya sih lanjutkan ke tahap technical test aja'
        },
        {
            sender: 'fatinzaida',
            receiver: 'haerulmutakin',
            body: 'Katanya sih lanjutkan ke tahap technical test aja'
        },
        {
            sender: 'fatinzaida',
            receiver: 'haerulmutakin',
            body: 'Katanya sih lanjutkan ke tahap technical test aja'
        },
        {
            sender: 'fatinzaida',
            receiver: 'haerulmutakin',
            body: 'Katanya sih lanjutkan ke tahap technical test aja'
        },
        {
            sender: 'fatinzaida',
            receiver: 'haerulmutakin',
            body: 'Katanya sih lanjutkan ke tahap technical test aja'
        },
        {
            sender: 'fatinzaida',
            receiver: 'haerulmutakin',
            body: 'Katanya sih lanjutkan ke tahap technical test aja'
        },
        {
            sender: 'fatinzaida',
            receiver: 'haerulmutakin',
            body: 'Katanya sih lanjutkan ke tahap technical test aja'
        },
    ]

    const Test = async () => {
        socket.emit('test', {to: roomId, body: 'hahai testing yal'})
    }
    return ( 
        <div className='chat-container'>
            <div className='chat-list'>
                {chats.map((item, index) => (
                    <div key={index} className={`chat-window ${item.sender === user?.username ? 'you' : ''}`}>
                        <div className="chat-body my-5 p-5 mx-10">
                            <div>{item.body}</div>
                            <div className='chat-meta'>22:57</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='chat-form d-flex align-center'>
                <input type="text" placeholder="Add a comment..."/>
                <button className='d-flex align-center justify-center'><FontAwesomeIcon icon={faAngleDoubleRight} /></button>
            </div>
        </div>
     );
}
 
export default Room;