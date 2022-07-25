import { createContext, useState, useEffect } from 'react';
import sio from 'socket.io-client';

const SocketContext = createContext(null);

export const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        setSocket(sio.connect('http://localhost:3001'))
    }, [])
    return (
        <SocketContext.Provider
            value={{
                socket
            }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext;