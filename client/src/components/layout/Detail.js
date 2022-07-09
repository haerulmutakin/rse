import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Detail = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    }
    return ( 
        <div className="detail-navbar d-flex align-center">
            <div onClick={handleBack} className='arrow-back mr-10'><FontAwesomeIcon icon={faArrowLeft} /></div>
            <div>Comments</div>
        </div>
    );
}
 
export default Detail;