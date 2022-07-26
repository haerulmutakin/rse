import Axios from 'axios';

const Api = Axios.create({
    baseURL: "http://localhost:3001/api/v1"
});

Api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.log(error)
    }
)

const get = async (endpoint, params) => {
    const resp = await Api.get(endpoint, {params: params});
    return resp.result;
}

const login = async (username) => {
    const userData = await get('/user', {username});
    if(userData) {
        localStorage.setItem('session', JSON.stringify(userData));
        return true;
    }
    return false;
}

const getRoomData = async (roomId) => {
    const roomData = await get(`/room/${roomId}`);
    return roomData;
}


const getUserRoom = async (userId) => {
    const roomData = await get('/room', {user_id: userId});
    return roomData;
}
export {
    login,
    getRoomData,
    getUserRoom
};