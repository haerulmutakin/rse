import {useState}  from 'react';
import { useNavigate } from 'react-router-dom';
import {login} from '../_services/Auth.service';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    const handleLogin = async () => {
        if(username !== '') {
            const res = await login(username)
            if(res) {
                navigate('/');
            } else {
                console.log('login failed')
            }
        }
    }
    return ( 
        <div className="login d-flex justify-center align-center">
            <div className="login-form">
                <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
     );
}
 
export default Login;