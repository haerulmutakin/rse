import { createContext, useEffect, useState } from 'react';
import sio from 'socket.io-client';
import { getUserRoom } from '_api/Api';
import {isAuthenticated} from '_services/Auth.service';

const AppContext = createContext(null);

export const AppProvider = ({children}) => {
    const socket = sio.connect('http://localhost:3001');
    const user = isAuthenticated();
    const [rooms, setRooms] = useState([]);



    const fetchUserRoom = async () => {
        const userRooms = await getUserRoom(user._id);
        console.log('fetching userRooms', userRooms);
        setRooms(userRooms)
    }

    useEffect(() => {
        if(socket && user) {
            console.log('socket initialized with user id', user._id);

            socket?.emit('set:online', {user_id: user._id});
            fetchUserRoom();
        }
    }, []);

    return (
        <AppContext.Provider
            value={{
                user,
                socket,
                rooms
            }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;