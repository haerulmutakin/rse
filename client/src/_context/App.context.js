import { createContext, useEffect } from 'react';
import sio from 'socket.io-client';
import {isAuthenticated} from '_services/Auth.service';

const AppContext = createContext(null);

export const AppProvider = ({children}) => {
    const socket = sio.connect('http://localhost:3001');
    const user = isAuthenticated();

    useEffect(() => {
        if(socket && user) {
            console.log('data user', user)
            socket?.emit('set:online', {user_id: user._id});
        }
    }, [socket, user]);

    return (
        <AppContext.Provider
            value={{
                user,
                socket
            }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;