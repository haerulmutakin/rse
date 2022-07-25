import Axios from 'axios';

const Api = Axios.create({
    baseURL: "http://localhost:3001/api/v1"
});

const login = async (username) => {
    console.log('login', username);
}

const get = async () => {
    Api.get()
}

export {login};