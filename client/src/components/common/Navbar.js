import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope, faHomeAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import AppContext from '_context/App.context';

const Navbar = () => {
    const {user, rooms} = useContext(AppContext);

    const [notif, setNotif] = useState({activity: 0, chat: 0});

    useEffect(() => {
        let unseenChatCount = 0;
        rooms.forEach(item => {
            if(item.unseen_messages.length > 0) {
                unseenChatCount += 1;
            }
        });

        setNotif({...notif, chat: unseenChatCount})
    }, [rooms])

    return ( 
        <div className="navbar d-flex flex-column">
            <div className='navbar-top d-flex align-center justify-between mx-8 pt-5'>
                <div className="brand">
                    Quote
                </div>
                <div>{user?.firstName}</div>
            </div>
            <div className="nav d-flex align-center justify-between mt-8">
                <NavLink to='/' activeclassname="active">
                    <div className='nav-icon'>
                        <FontAwesomeIcon icon={faHomeAlt} />
                    </div>
                </NavLink>
                <NavLink to='/notifications' activeclassname="active">
                    <div className='nav-icon'>
                        <FontAwesomeIcon icon={faBell} />
                        {notif.activity > 0 && <div className='badge'></div>}
                    </div>
                </NavLink>
                <NavLink to='/rooms'  activeclassname="active">
                    <div className='nav-icon'>
                        <FontAwesomeIcon icon={faEnvelope} />
                        {notif.chat > 0 && <div className='badge'></div>}
                    </div>
                </NavLink>
                <NavLink to='/new-quote'  activeclassname="active">
                    <div className='nav-icon plus'>
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                </NavLink>
                
            </div>
        </div>
     );
}
 
export default Navbar;