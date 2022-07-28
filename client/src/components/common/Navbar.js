import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope, faHomeAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import AppContext from '_context/App.context';

const Navbar = () => {

    const {user} = useContext(AppContext)

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
                        <div className='badge'></div>
                    </div>
                </NavLink>
                <NavLink to='/rooms'  activeclassname="active">
                    <div className='nav-icon'>
                        <FontAwesomeIcon icon={faEnvelope} />
                        <div className='badge'></div>
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