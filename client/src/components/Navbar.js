import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope, faHomeAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import SocketContext from '../_context/SocketContext';
import { NavLink } from 'react-router-dom';
import UserContext from '../_context/UserContext';

const Navbar = () => {
    const {notifications} = useContext(SocketContext);
    const user = useContext(UserContext);

    const unseenNotifications = [...notifications].filter(item => !item.seen);

    return ( 
        <div className="navbar">
            <div className='navbar-top d-flex align-center justify-between mx-8 pt-5'>
                <div className="brand">
                    Quote
                </div>
                <div className='nav-user'>{user?.firstName}</div>
            </div>
            <div className="nav d-flex align-center justify-between mt-4">
                <div className='nav-left'>
                    <NavLink to='/' activeclassname="active">
                        <div className='nav-icon'>
                            <FontAwesomeIcon icon={faHomeAlt} />
                        </div>
                    </NavLink>
                    <NavLink to='/notifications' activeclassname="active">
                        <div className='nav-icon'>
                            <FontAwesomeIcon icon={faBell} />
                            {unseenNotifications.length > 0 && <div className='badge'>{unseenNotifications.length}</div>}
                        </div>
                    </NavLink>
                    <NavLink to='/message'  activeclassname="active">
                        <div className='nav-icon'>
                            <FontAwesomeIcon icon={faEnvelope} />
                            {/* {unseenNotifications.length > 0 && <div className='badge'>{unseenNotifications.length}</div>} */}
                        </div>
                    </NavLink>
                    <NavLink to='/new-quote'  activeclassname="active">
                        <div className='nav-icon plus'>
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    </NavLink>
                </div>
                
            </div>
        </div>
     );
}
 
export default Navbar;