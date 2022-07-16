import {useContext } from 'react';
// import UserContext from '../_context/UserContext';
import SocketContext from '../_context/SocketContext';
import MessageItem from './MessageItem';

const Message = () => {
    // const user = useContext(UserContext);
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