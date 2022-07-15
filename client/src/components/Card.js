import { useContext, useEffect, useState, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { faComment, faHeart as heart } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import SocketContext from '../_context/SocketContext';
import UserContext from '../_context/UserContext';
import { format } from '../_helpers/Date';
import Api from "../_api/ApiInstance";


const Card = ({quote}) => {
    const {onlineUsers = [], userLikes = [], socket} = useContext(SocketContext);
    const user = useContext(UserContext);
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);

    const handleComment = () => {
        navigate(`/detail/comments/${quote._id}`)
    }

    const handleMoreLikes = () => {
        navigate(`/detail/likes/${quote._id}`) 
    }

    const isLiked = (quoteId) => {
        return userLikes.some(item => item.quoteId === quoteId)
    }

    const doLike = () => {
        socket.emit('like', {
            quoteId: quote._id,
            authorId: user._id
        })
    }

    const doUnlike = (quoteId) => {
        const data = userLikes.find(item => item.quoteId === quoteId)
        if(data) {
            socket.emit('unlike', {_id: data.id})
        }
    }

    const handleLike = (quoteId) => {
        if(isLiked(quoteId)) {
            doUnlike(quoteId);
        } else {
            doLike();
        }
    }

    const fetchComments = async () => {
        const params = {
            'quote_id': quote._id
        }
        const resp = await Api.get('/comment', {params: params});
        const data = resp.data;
        const {result} = data;
        setComments(result);
    }

    const fetchLikes = async () => {
        const params = {
            'quote_id': quote._id
        }
        const resp = await Api.get('/like', {params: params});
        const data = resp.data;
        const {result} = data;
        setLikes(result);
    }

    useEffect(() => {
        fetchComments();
        fetchLikes();
    }, [])

    const isOnline = () => {
        return onlineUsers.includes(quote.userId)
    }

    return ( 
        <div className="card">
            <div className="card-header d-flex align-center ml-8">
                <div className={`profile profile-2 ${isOnline() ? 'online' : ''}`}>
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="user-name">{quote.username}</div>
            </div>
            <div className="card-body" style={{backgroundColor: quote.theme}}>
                "{quote.body}"
            </div>
            <div className="card-footer d-flex align-center justify-between mx-8">
                <div className='action d-flex align-center'>
                    <div onClick={() => handleLike(quote?._id)} className={`${isLiked(quote?._id) ? 'like' : ''}`}><FontAwesomeIcon icon={isLiked(quote?._id) ? faHeart : heart} /></div>
                    <div onClick={handleComment}><FontAwesomeIcon icon={faComment} /></div>
                    <div><FontAwesomeIcon icon={faExternalLink} /></div>
                </div>
                <div className='quote-date'>{format(quote.createdAt, 'DD MMMM YYYY')}</div>
            </div>
            <div className='quote-meta-like mx-8 mt-5'>
                {likes.length > 0 && (
                    <Fragment>
                        Liked by <b>{likes[likes.length - 1].authorId?.username}</b> 
                        {likes.length > 1 && (
                            <Fragment>and <b className='more-like-label' onClick={handleMoreLikes}>{likes.length - 1} others</b></Fragment>
                        )} 
                    </Fragment>
                )}
                <div>
                </div>
                <div className='mt-5'>
                    {comments.length > 2 && (
                        <div className='view-comment' onClick={handleComment}>View all {comments.length} comments</div>
                    )}
                    {comments.map((item, index) => (
                        <Fragment key={index}>
                            {index < 2 && (
                                <div className="mt-3"><b>{item.authorId.username}</b> {item.body}</div>
                            )}
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default Card;