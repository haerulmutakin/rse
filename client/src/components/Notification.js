import { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import SocketContext from "../_context/SocketContext";

const Notification = () => {
    const {onlineUsers, notifications} = useContext(SocketContext);

    const isOnline = (userId) => {
        return onlineUsers.includes(userId)
    }
    return ( 
        <div className="mx-8">
            {notifications.map(item => (
                <div key={item._id} className="d-flex align-center my-10">
                     <div className={`profile profile-3 ${isOnline(item?.authorId._id) ? 'online' : ''}`}>
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className="user-name"><b>{item?.authorId.username}</b> {item.type} your quote</div>
                </div>
            ))}
        </div>
     );
}
 
export default Notification;