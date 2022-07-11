import { createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";
import UserContext from "./UserContext";

const SocketContext  = createContext(null);

export const SockerProvider = ({children}) => {
    const user = useContext(UserContext)
    const socket = io.connect('http://localhost:3001');

    useEffect(() => {
        if(user) {
            socket.emit('newOnlineUser', {username: user.username})
        }
    }, [user])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext;