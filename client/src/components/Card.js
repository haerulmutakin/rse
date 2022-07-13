import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import SocketContext from '../_context/SocketContext';
import UserContext from '../_context/UserContext';

const Card = ({quote}) => {
    const socket = useContext(SocketContext)
    const user = useContext(UserContext);
    const navigate = useNavigate()

    const comments = [
        {
            username: 'ummuzaida',
            body: 'Siap-siap capek kalo udah bisa lari fatin itu kak wkkkk'
        },
        {
            username: 'haerulmutakin',
            body: 'Siap-siap ngekor kemana aja dia pergi haha'
        },
    ]
    const handleComment = () => {
        navigate(`/detail/comments/${quote._id}`)
    }

    const handleMoreLikes = () => {
        navigate(`/detail/likes/${quote._id}`) 
    }

    const handleLike = (username) => {
        socket.emit('like', {
            receiver: username,
            sender: user.username
        })
    }
    return ( 
        <div className="card">
            <div className="card-header d-flex align-center ml-8">
                <div className="user-profile-2">
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="user-name">{quote.username}</div>
            </div>
            <div className="card-body" style={{backgroundColor: quote.theme}}>
                "{quote.body}"
            </div>
            <div className="card-footer d-flex align-center ml-8">
                <div onClick={() => handleLike(quote.username)}><FontAwesomeIcon icon={faHeart} /></div>
                <div onClick={handleComment}><FontAwesomeIcon icon={faComment} /></div>
                <div><FontAwesomeIcon icon={faExternalLink} /></div>
            </div>
            <div className='quote-meta-like mx-8 mt-5'>
                <div>
                    Liked by <b>ummuzaida</b> and <b className='more-like-label' onClick={handleMoreLikes}>10 others</b>
                </div>
                <div className='mt-5'>
                    <div className='view-comment' onClick={handleComment}>View all 6 comments</div>
                    {comments.map((item, index) => (
                        <div key={index} className="mt-3"><b>{item.username}</b> {item.body}</div>
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default Card;