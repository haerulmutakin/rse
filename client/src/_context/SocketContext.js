import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import UserContext from "./UserContext";

const SocketContext  = createContext(null);

export const SockerProvider = ({children}) => {
    const [socket, setSocket] = useState(null)
    const user = useContext(UserContext)

    const socketConnection = async () => {
        await setSocket(io.connect('http://localhost:3001'));
        if(user) {
            socket.emit('newOnlineUser', {username: user.username})
        }
    }

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