import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import UserContext from "./UserContext";

const SocketContext  = createContext(null);

export const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const user = useContext(UserContext)

    const socketConnection =  () => {
        setSocket(io.connect('http://localhost:3001'));
    }

    const initialSocket = () => {
        if(user && socket) {
            socket.emit('newOnlineUser', {userId: user._id})
            socket.on('update_online_user', (onlineUsers = []) => {
                setOnlineUsers(onlineUsers.map(item => item.userId))
            })
        }
    }

    useEffect(() => {
        initialSocket();
    }, [user])

    useEffect( () => {
        socketConnection();
    }, [])

    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext;