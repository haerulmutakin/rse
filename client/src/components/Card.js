import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';

const Card = ({quote}) => {
    const navigate = useNavigate()
    const handleComment = () => {
        navigate(`/comments/${quote.id}`)
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
                "{quote.quote}"
            </div>
            <div className="card-footer d-flex align-center ml-8">
                <div><FontAwesomeIcon icon={faHeart} /></div>
                <div onClick={handleComment}><FontAwesomeIcon icon={faComment} /></div>
                <div><FontAwesomeIcon icon={faExternalLink} /></div>
            </div>
        </div>
     );
}
 
export default Card;