import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ProfilePlaceholder = () => {
    return ( 
        <div className="profile">
            <FontAwesomeIcon icon={faUser} />
            <div className="online" />
        </div>
     );
}
 
export default ProfilePlaceholder;