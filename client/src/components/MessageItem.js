import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const MessageItem = ({item}) => {
    const navigate = useNavigate();

    const handleRoomClick = () => {
        navigate(`/custom/room/${item._id}`)
    }
    return ( 
        <div onClick={handleRoomClick} key={item._id} className="chat-room d-flex align-center p-5">
            <div className={`profile profile-3`}>
                <FontAwesomeIcon icon={faUser} />
            </div>
            <div>
                {`${item?.receiver?.firstName} ${item?.receiver?.lastName}`}
            </div>
        </div>
     );
}
 
export default MessageItem;