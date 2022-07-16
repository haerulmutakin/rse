import {Fragment} from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Custom = () => {
    const navigate = useNavigate();
    const outlet = useOutlet();

    const handleBack = () => {
        navigate(-1);
    }
    return ( 
        <Fragment>
            <div className="detail-navbar d-flex align-center">
                <div onClick={handleBack} className='arrow-back mr-10'><FontAwesomeIcon icon={faArrowLeft} /></div>
                <div className='detail-layout-title'>Custom</div>
            </div>
            {outlet}
        </Fragment>
     );
}
 
export default Custom;