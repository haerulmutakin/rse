import { useContext } from "react";
import AppContext from "_context/App.context";
import Room from "./Room";

const Rooms = () => {
    const {rooms} = useContext(AppContext);

    return ( 
        <div className="room-container">
            {
                rooms.map((item, index) => (
                    <Room room={item} key={index} />
                ))
            }
        </div>
     );
}
 
export default Rooms;