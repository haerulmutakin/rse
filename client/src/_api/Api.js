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

const post = async (endpoint, data) => {
    const resp = await Api.post(endpoint, data);
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

const getFriends = async (params) => {
    const friends =  await get('/friends', params);
    return friends
}

const getRoomData = async (roomId) => {
    const roomData = await get(`/room/${roomId}`);
    return roomData;
}

const getUserRoom = async (userId) => {
    const roomData = await get('/room', {user_id: userId});
    return roomData;
}

const getMessages = async (roomId) => {
    const messages = await get(`/message/${roomId}`);
    return messages;
}

const createRoom = async (body) => {
    const roomData = await post('/room', body);
    return roomData;
}
export {
    login,
    getRoomData,
    getUserRoom,
    getMessages,
    getFriends,
    createRoom
};