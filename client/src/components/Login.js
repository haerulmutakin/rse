import {useState}  from 'react';
import { useNavigate } from 'react-router-dom';
import {login} from '_api/Service';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await login(username);
    }
    return ( 
        <div className="login d-flex justify-center align-center">
            <form onSubmit={handleLogin} className="login-form">
                <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                <button onClick={handleLogin}>Login</button>
            </form>
        </div>
     );
}
 
export default Login;