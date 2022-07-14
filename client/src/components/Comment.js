import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../_context/UserContext';
import Api from "../_api/ApiInstance";
import SocketContext from '../_context/SocketContext';

const Comment = () => {
    const urlParams = useParams();
    const user = useContext(UserContext);
    const {onlineUsers} = useContext(SocketContext);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const fetchComments = async () => {
        const {id} = urlParams;
        const params = {
            'quote_id': id
        }
        const resp = await Api.get('/comment', {params: params});
        const data = resp.data;
        const {result} = data;
        setComments(result);
    }

    const submitComment = async () => {
        const {id} = urlParams;
        const payload = {
            quoteId: id,
            authorId: user._id,
            body: comment
        }

        const resp = await Api.post('/comment', payload)
        const data = resp.data;
        if(data.status === true) {
            fetchComments();
        }
    }

    useEffect(() => {
        fetchComments();
    }, []);

    const isOnline = (userId) => {
        return onlineUsers.includes(userId)
    }

    return ( 
        <div className="comment my-10">
            <div>
                {comments.map((item, index) => (
                    <div key={index} className="d-flex align-start mx-5 mb-10">
                        <div>
                            <div className={`profile profile-3 ${isOnline(item.authorId._id) ? 'online': ''}`}>
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <b>{item.authorId?.username}</b> {item.body}
                            </div>
                            <div className='comment-action'>
                                <span>Reply</span>
                                <span>Like</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='comment-form d-flex align-center'>
                <input type="text" onChange={(e) => setComment(e.target.value)} placeholder="Add a comment..."/>
                <button onClick={submitComment} disabled={comment === ''} className='d-flex align-center justify-center'><FontAwesomeIcon icon={faAngleDoubleRight} /></button>
            </div>
        </div>
     );
}
 
export default Comment;