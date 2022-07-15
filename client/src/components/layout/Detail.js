import { useNavigate, useOutlet, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Fragment } from 'react';

const Detail = () => {
    const navigate = useNavigate();
    const outlet = useOutlet();
    const urlparams = useParams();

    const splitedParams = urlparams['*'].split('/')
    const secondParams = splitedParams[1].replace('-', ' ');
    
    const handleBack = () => {
        navigate(-1);
    }
    return ( 
        <Fragment>
            <div className="detail-navbar d-flex align-center">
                <div onClick={handleBack} className='arrow-back mr-10'><FontAwesomeIcon icon={faArrowLeft} /></div>
                <div className='detail-layout-title'>{secondParams}</div>
            </div>
            {outlet}
        </Fragment>
    );
}
 
export default Detail;