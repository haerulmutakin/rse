import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import AppContext from "_context/App.context";
import { getFriends, createRoom } from "_api/Api";
import ProfilePlaceholder from "components/common/ProfilePlaceholder";

const Friends = () => {
    const {user} = useContext(AppContext)
    const navigate = useNavigate();
    const [friends, setFriends] = useState([]);

    const handleBack = () => {
        navigate(-1)
    }

    const handleFriendClick = async (item) => {
        if(item.room_id !== 'none') {
            navigate(`/room/${item.room_id}`)
        } else {
            const payload = {roomMembers: [user._id, item.id]};
            const roomData = await createRoom(payload);
            navigate(`/room/${roomData._id}`);
        }
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
                <div onClick={handleBack}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                <div className="ml-5 mr-3">
                    Select Friends
                </div>
            </div>
            <div>
                {friends.map(item => (
                    <div key={item.id} className="friend-item" onClick={() => handleFriendClick(item)}>
                        <ProfilePlaceholder />
                        <div className="ml-5"><b>{item.name}</b></div>
                    </div>
                ))}
            </div>
        </Fragment>  
    );
}
 
export default Friends;