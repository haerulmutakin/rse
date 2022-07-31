import { createContext, useEffect, useState } from 'react';
import sio from 'socket.io-client';
import { getUserRoom } from '_api/Api';
import {isAuthenticated} from '_services/Auth.service';

const AppContext = createContext(null);

export const AppProvider = ({children}) => {
    const socket = sio('http://localhost:3001');
    const user = isAuthenticated();
    const [rooms, setRooms] = useState([]);

    const fetchUserRoom = async () => {
        const userRooms = await getUserRoom(user._id);
        joiningRooms(userRooms);
        const managedRooms = manageRooms(userRooms)
        setRooms(managedRooms);
    }

    const setSeen = (data) => {
        socket.emit('set:seen', data)
    }

    const manageRooms = (roomData = []) => {
        roomData.forEach(item => {
            const {messages} = item;
            const lastMessage = messages[messages.length - 1];
            const unseen = messages.filter(x => !x.seen_by.includes(user._id));
            item.last_message = lastMessage;
            item.unseen_messages = unseen;
        });
        return roomData.sort(sortRoom);

    }

    const sortRoom = (a, b) => {
        return (a.last_message?.createdAt < b.last_message?.createdAt) ? 1 : -1;
    }

    const joiningRooms = async (userRooms) => {
        if(userRooms.length > 0) {
            const roomIds = userRooms.map(item => item.id);
            socket.emit('set:join', roomIds);
        }
    }

    useEffect(() => {
        if(socket && user) {
            fetchUserRoom();
            socket?.emit('set:online', {user_id: user._id});

            socket.on('new:roommessage', (data) => {
                setRooms(old => {
                    const idx = old.findIndex(item => item.id === data.room);
                    if(idx >= 0) {
                        const current = old[idx];
                        current.messages.push(data);
                    }
                    const managedRooms = manageRooms(old);
                    return [...managedRooms];
                })
            })

            socket.on('get:roomupdate', (data) => {
                console.log('roomUpdate y', data)

                setRooms(old => {
                    const idx = old.findIndex(item => item.id === data.id);
                    if(idx >= 0) {
                        old[idx] = data;
                    }
                    const managedRooms = manageRooms(old);
                    return [...managedRooms];
                })
            })
        }

        return () => {
            socket.off('new:roommessage')
            socket.off('get:roomupdate')
        }
    }, []);

    return (
        <AppContext.Provider
            value={{
                user,
                socket,
                rooms,
                setSeen
            }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;