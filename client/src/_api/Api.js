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

const login = async (username) => {
    const resp = await Api.get('/user', {params: {username}});
    const {result} = resp;
    if(result) {
        localStorage.setItem('session', JSON.stringify(result));
        return true;
    }
    return false;
}

export {login};