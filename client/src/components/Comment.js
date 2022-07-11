import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Comment = () => {
    const comments = [
        {
            username: 'rani',
            body: 'wah anaknya udah merangkak? gimana kabarnya fatin?'
        },
        {
            username: 'ciam',
            body: 'fatin udah besaaar'
        },
        {
            username: 'yudin',
            body: 'Sudah gede nakenku'
        },
    ]
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
                            <b>{item.username}</b> {item.body}
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