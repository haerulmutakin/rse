import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Api from "../_api/ApiInstance";

const Comment = () => {
    const urlParams = useParams();
    const [comments, setComments] = useState([]);

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

    useEffect(() => {
        fetchComments();
    }, []);
    return ( 
        <div className="comment">
            {comments.map((item, index) => (
                <div key={index} className="d-flex align-start my-10 mx-5">
                    <div>
                        <div className="user-profile-3">
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
     );
}
 
export default Comment;