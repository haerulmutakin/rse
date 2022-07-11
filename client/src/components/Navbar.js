import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return ( 
        <div className="navbar d-flex align-center justify-between">
            <div className="brand">
                Quoten
            </div>
            <div className="nav d-flex">
                <div className='nav-item'>
                    <FontAwesomeIcon icon={faBell} />
                    <div className='badge'>2</div>
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