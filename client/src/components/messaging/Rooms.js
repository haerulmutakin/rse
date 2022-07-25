import { useNavigate } from "react-router-dom";
import ProfilePlaceholder from "components/common/ProfilePlaceholder";

const Rooms = () => {
    const navigate = useNavigate();
    const list = [
        {
            name: 'Haerul Mutakin',
            last: 'Lorem ipsum',
            time: '22:07'
        },
        {
            name: 'Ummu Zaida',
            last: 'Dolor sit amet',
            time: '09:40'
        },
        {
            name: 'Haerul Mutakin',
            last: 'Lorem ipsum',
            time: '22:07'
        },
        {
            name: 'Ummu Zaida',
            last: 'Dolor sit amet',
            time: '09:40'
        },
        {
            name: 'Haerul Mutakin',
            last: 'Lorem ipsum',
            time: '22:07'
        },
        {
            name: 'Ummu Zaida',
            last: 'Dolor sit amet',
            time: '09:40'
        },
        {
            name: 'Haerul Mutakin',
            last: 'Lorem ipsum',
            time: '22:07'
        },
        {
            name: 'Ummu Zaida',
            last: 'Dolor sit amet',
            time: '09:40'
        },
        {
            name: 'Haerul Mutakin',
            last: 'Lorem ipsum',
            time: '22:07'
        },
        {
            name: 'Ummu Zaida',
            last: 'Dolor sit amet',
            time: '09:40'
        },
        {
            name: 'Haerul Mutakin',
            last: 'Lorem ipsum',
            time: '22:07'
        },
        {
            name: 'Ummu Zaida',
            last: 'Dolor sit amet',
            time: '09:40'
        },
    ]

    const handleNavigate = () => {
        navigate('/room')
    }
    return ( 
        <div className="room-container">
            {
                list.map((item, index) => (
                    <div key={index} className="room" onClick={handleNavigate}>
                        <ProfilePlaceholder />
                        <div className="room-info">
                            <div className="username">{item.name}</div>
                            <div className="message">{item.last}</div>
                        </div>
                        <div className="time">{item.time}</div>
                    </div>
                ))
            }
        </div>
     );
}
 
export default Rooms;