import { Fragment, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import SocketContext from "../_context/SocketContext";
import { format } from '../_helpers/Date';

const Notification = () => {
    const {onlineUsers, notifications} = useContext(SocketContext);

    const isOnline = (userId) => {
        return onlineUsers.includes(userId)
    }
    return ( 
        <div className="notification">
            {notifications.map(item => (
                <div key={item._id} className="d-flex align-center  mx-5 my-10">
                     <div className={`profile profile-3 ${isOnline(item?.authorId._id) ? 'online' : ''}`}>
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div>
                        <span className="sender-name mr-3">{item?.authorId.username}</span>
                        <span className="notif-desc">{item?.type === 'like' ? 'liked your quote' : `commented: ${item.body}`} {format(item.createdAt, 'DD MMMM')}</span>
                    </div>
                </div>
            ))}
        </div>
     );
}
 
export default Notification;