import {useContext } from 'react';
import SocketContext from '../_context/SocketContext';
import MessageItem from './MessageItem';

const Message = () => {
    const {userRooms} = useContext(SocketContext)
    return ( 
        <div>
            {userRooms.map(item => (
                <MessageItem key={item._id} item={item} />
            ))}
        </div>
     );
}
 
export default Message;