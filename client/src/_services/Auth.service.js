// import Api from "../_api/Service";

// export const login = async (username) => {
//     try {
//         const params = {
//             username: username
//         }
//         const resp = await Api.get('/user', {params: params})
//         const data = resp.data;
//         const {result} = data;
        
//         if(result.length > 0) {
//             const userData = result[0];
//             localStorage.setItem('session', JSON.stringify(userData))
//             return true;
//         }
//         return false;
//     } catch (error) {
//         return false;
//     }
//     return;
// }

// export const isAuthenticated = () => {
// 	const session = localStorage.getItem('session');
//     return JSON.parse(session);
// };