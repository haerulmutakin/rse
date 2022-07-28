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

    const lastMessage = () => {
        const {messages} = room;
        if(messages.length > 0) {
            return messages[messages.length - 1]
        }
        return null;
    }
    return ( 
        <div className="room" onClick={handleNavigate}>
            <ProfilePlaceholder />
            <div className="room-info">
                <div className="username">{getReceiver()}</div>
                <div className="message">{lastMessage()?.body}</div>
            </div>
            <div className="time">{format(room.updated_at, 'HH:mm')}</div>
        </div>
    );
}
 
export default Room;