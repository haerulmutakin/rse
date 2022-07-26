import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faAngleDoubleRight, faPersonMilitaryRifle } from "@fortawesome/free-solid-svg-icons";
import ProfilePlaceholder from "components/common/ProfilePlaceholder";
import { getRoomData } from "_api/Api";
import AppContext from "_context/App.context";

const Chat = () => {
    const {user} = useContext(AppContext);
    const navigate = useNavigate();
    const params = useParams();
    const {id} = params;
    const [room, setRoom] = useState(null)

    const hadnleBakck = () => {
        navigate(-1)
    }

    const messages = [
        {
            username: 'haerulmutakin',
            body: 'Hi, apa kabar?',
            time: '10:19'
        },
        {
            username: 'ummuzaida',
            body: 'Hi, sehat. kamu gimana?',
            time: '10:21'
        },
        {
            username: 'ummuzaida',
            body: 'Yup, theres an icon for that. Browse our icon categories to find just the right icon.',
            time: '10:25'
        },
        {
            username: 'haerulmutakin',
            body: '5 unique icon styles, with a brand new sharp family of styles coming soon.',
            time: '10:19'
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('ahai')
    }

    const fetchRoomData = async () => {
        console.log('get room data')
        const data = await getRoomData(id);
        setRoom(data);
    }

    const getReceiver = () => {
        if(room) {
            const {roomMembers} = room;
            const filtered = roomMembers.filter(item => item._id !== user._id);
            if(filtered.length === 1) {
                const receiver = filtered[0];
                return `${receiver.firstName} ${receiver.lastName}`
            }
        }
        return ''
    }

    useEffect(() => {
        fetchRoomData();
    }, [])
    return (
        <Fragment>
            <div className="detail-navbar">
                <div onClick={hadnleBakck}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                <div className="ml-5 mr-3">
                    <ProfilePlaceholder />
                </div>
                <div>{getReceiver()}</div>
            </div>
            <div className="message-container">
                {messages.map((item, index) => (
                    <div key={index} className={`message-item ${item.username === 'ummuzaida' ? 'you' : ''}`}>
                        <div className="message-meta">
                            <div className="body">{item.body}</div>
                            <div className="time">{item.time}</div>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="message-form">
                <input type="text" placeholder="Message" />
                <button>
                    <FontAwesomeIcon icon={faAngleDoubleRight} />
                </button>
            </form>
        </Fragment>
     );
}
 
export default Chat;