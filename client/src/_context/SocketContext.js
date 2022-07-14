import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import UserContext from "./UserContext";

const SocketContext  = createContext(null);

export const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState(null)
    const user = useContext(UserContext)

    const socketConnection = async () => {
        setSocket(io.connect('http://localhost:3001'));
    }

    useEffect(() => {
        if(user && socket) {
            socket.emit('newOnlineUser', {username: user.username})
        }
    }, [user])

    useEffect( () => {
        socketConnection();
    }, [])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext;