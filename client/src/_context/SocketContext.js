import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import UserContext from "./UserContext";
import Api from "../_api/ApiInstance";

const SocketContext  = createContext(null);

export const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [notifications, setNotifications] = useState([])
    const [userLikes, setUserLikes] = useState([]);
    const [newQuote, setNewQuote] = useState(null);
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

    const fetchLikes = async () => {
        const params = {
            'author_id':  user?._id
        }

        const resp = await Api.get('/like', {params: params})
        const data = resp.data;
        const {result} = data;
        const map = result.map(item => {
            return {
                quoteId: item.quoteId,
                id: item._id
            }
        });
        setUserLikes(map);
    }

    const initialSocket = () => {
        if(user && socket) {
            socket.emit('set:online', {userId: user._id})
            socket.on('get:online', (onlineUsers = []) => {
                setOnlineUsers(onlineUsers.map(item => item.userId))
            })
            socket.on('get:notification', (event) => {
                const {type, data} = event;
                if(type === 'new') {
                    setNotifications(old => [data, ...old])
                } else {
                    setNotifications(newData => newData.filter(x => x._id !== data._id))
                }
            })

            socket.on('get:likes', (data = []) => {
                const map = data.map(item => {
                    return {
                        quoteId: item.quoteId,
                        id: item._id
                    }
                });
                setUserLikes(map);
            })

            socket.on('get:updatednotification', (data) => {
                setNotifications(data);
            })

            socket.on('get:quote', (data) => {
                setNewQuote(data);
            })
            
            fetchNotification();
            fetchLikes();
        }
    }

    useEffect(() => {
        initialSocket();
    }, [user])

    useEffect( () => {
        socketConnection();
    }, [])

    return (
        <SocketContext.Provider 
            value={{
                socket,
                onlineUsers,
                notifications,
                userLikes,
                newQuote
            }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext;