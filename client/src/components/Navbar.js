import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import SocketContext from '../_context/SocketContext';
import { useNavigate } from 'react-router-dom';
import UserContext from '../_context/UserContext';

const Navbar = () => {
    const {notifications} = useContext(SocketContext);
    const user = useContext(UserContext);
    const navigate = useNavigate();

    const handleNotif = () => {
        navigate('/detail/notifications')
    }

    return ( 
        <div className="navbar d-flex align-center justify-between">
            <div className="brand">
                {user?.username}
            </div>
            <div className="nav d-flex">
                <div className='nav-item' onClick={handleNotif}>
                    <FontAwesomeIcon icon={faBell} />
                    {notifications.length > 0 && <div className='badge'>{notifications.length}</div>}
                    
                </div>
                <div className='nav-item'>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <div className='badge'>1</div>
                </div>
                <div className='nav-item'><FontAwesomeIcon icon={faUser} /></div>
            </div>
        </div>
     );
}
 
export default Navbar;