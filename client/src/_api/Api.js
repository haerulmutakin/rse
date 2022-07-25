// import Axios from 'axios';

// const Api = Axios.create({
//     baseURL: "http://localhost:3001/api/v1"
// });

const login = async (username) => {
    localStorage.setItem('session', JSON.stringify({username}))
    return true;
}

export {login};