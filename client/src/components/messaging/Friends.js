import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import AppContext from "_context/App.context";
import { getFriends } from "_api/Api";
import ProfilePlaceholder from "components/common/ProfilePlaceholder";

const Friends = () => {
    const {user} = useContext(AppContext)
    const navigate = useNavigate();
    const [friends, setFriends] = useState([]);

    const hadnleBakck = () => {
        navigate(-1)
    }

    const getFriendList = async () => {
        const params = {
            user_id: user._id
        }
        const data = await getFriends(params)
        setFriends(data);
    }

    useEffect(() => {
        getFriendList();
    }, []);

    return ( 
        <Fragment>
            <div className="detail-navbar">
                <div onClick={hadnleBakck}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                <div className="ml-5 mr-3">
                    Select Friends
                </div>
            </div>
            <div>
                {friends.map(item => (
                    <div key={item._id} className="friend-item">
                        <ProfilePlaceholder />
                        <div className="ml-5"><b>{`${item.firstName} ${item.lastName}`}</b></div>
                    </div>
                ))}
            </div>
        </Fragment>  
    );
}
 
export default Friends;