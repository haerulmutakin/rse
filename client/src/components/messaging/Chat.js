import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import ProfilePlaceholder from "components/common/ProfilePlaceholder";

const Chat = () => {
    const navigate = useNavigate();

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
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('ahai')
    }
    return (
        <Fragment>
            <div className="detail-navbar">
                <div onClick={hadnleBakck}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                <div className="ml-5 mr-3">
                    <ProfilePlaceholder />
                </div>
                <div>Haerul Mutakin</div>
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