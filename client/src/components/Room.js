import {useContext } from 'react';
import { useParams } from 'react-router-dom';
import SocketContext from '../_context/SocketContext';
const Room = () => {
    const {socket} = useContext(SocketContext)
    const urlparams = useParams();
    const roomId = urlparams['*'].split('/')[2]
    console.log(roomId)

    const Test = async () => {
        socket.emit('test', {to: roomId, body: 'hahai testing yal'})
    }
    return ( 
        <div>
            <button onClick={Test}>Test</button>
        </div>
     );
}
 
export default Room;