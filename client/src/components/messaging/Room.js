import { useNavigate } from "react-router-dom";
import { format } from "_helpers/Date";
import ProfilePlaceholder from "components/common/ProfilePlaceholder";

const Room = ({room}) => {
    const navigate = useNavigate();

    const getReceiver = () => {
        let receiverLabel = '';
        const {receiver} = room;
        receiver.forEach(item => {
            receiverLabel += `${item.firstName} ${item.lastName}`
        })
        return receiverLabel;
    }
    const handleNavigate = () => {
        navigate(`/room/${room.id}`)
    }
    return ( 
        <div className="room" onClick={handleNavigate}>
            <ProfilePlaceholder />
            <div className="room-info">
                <div className="username">{getReceiver()}</div>
                <div className="message">{room.last_message?.body}</div>
            </div>
            {room.unseen_messages.length > 0 && (
                <div className="unseen">{room.unseen_messages.length}</div>
            )}
            <div className="time">{format(room.last_message?.createdAt)}</div>
        </div>
    );
}
 
export default Room;