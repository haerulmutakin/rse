import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import AppContext from "_context/App.context";
import Room from "./Room";

const Rooms = () => {
    const {rooms} = useContext(AppContext);
    const navigate = useNavigate();

    const handleNewRoom = () => {
        navigate('/friends')
    }

    return ( 
        <div className="room-container">
            {
                rooms.map((item, index) => (
                    item.last_message && <Room room={item} key={index} />
                ))
            }
            <div className="new-room-fab" onClick={handleNewRoom}>
                <FontAwesomeIcon icon={faCommentAlt} />
            </div>
        </div>
     );
}
 
export default Rooms;