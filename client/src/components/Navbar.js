import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import SocketContext from '../_context/SocketContext';

const Navbar = () => {
    const socket = useContext(SocketContext);
    const [notif, setNotif] = useState(0);

    useEffect(() => {
        socket?.on('like', (data) => {
            console.log(data);
            setNotif((notif) => notif + 1)
        })
    }, [socket])
    return ( 
        <div className="navbar d-flex align-center justify-between">
            <div className="brand">
                Quoten
            </div>
            <div className="nav d-flex">
                <div className='nav-item'>
                    <FontAwesomeIcon icon={faBell} />
                    {notif > 0 && <div className='badge'>{notif}</div>}
                    
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