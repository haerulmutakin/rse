import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import UserContext from "./UserContext";
import Api from "../_api/ApiInstance";

const SocketContext  = createContext(null);

export const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [notifications, setNotifications] = useState([])
    const user = useContext(UserContext)

    const socketConnection =  () => {
        setSocket(io.connect('http://localhost:3001'));
    }

    const fetchNotification = async () => {
        const params = {
            'receiver_id':  user?._id
        }

        const resp = await Api.get('/notification', {params: params})
        const data = resp.data;
        const {result} = data;
        setNotifications(result);
    }

    const initialSocket = () => {
        if(user && socket) {
            socket.emit('newOnlineUser', {userId: user._id})
            socket.on('update_online_user', (onlineUsers = []) => {
                setOnlineUsers(onlineUsers.map(item => item.userId))
            })
            socket.on('notification', (data) => {
                setNotifications(old => [data, ...old])
            })
            fetchNotification();
        }
    }

    useEffect(() => {
        initialSocket();
    }, [user])

    useEffect( () => {
        socketConnection();
    }, [])

    return (
        <SocketContext.Provider value={{socket, onlineUsers, notifications}}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext;