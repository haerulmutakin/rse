import { createContext } from "react";
import { io } from "socket.io-client";

const SocketContext  = createContext();
export const socket = io.connect('http://localhost:3001');

export default SocketContext;