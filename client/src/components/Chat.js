import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Chat = () => {
    const friends = [
        {
            name: 'Fatin Zaida',
            isActive: true
        },
        {
            name: 'Ummu',
            isActive: true
        },
        {
            name: 'Aqila',
            isActive: false
        },
    ]
    return ( 
        <div className="chat">
            {friends.map((item, index) => (
                <div key={index} className="friend-item d-flex align-center my-5 ml-5">
                    <div className="user-profile-3 mr-5">
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className="">{item.name}</div>
                </div>
            ))}
        </div>
     );
}
 
export default Chat;