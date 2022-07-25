import {Routes, Route} from 'react-router-dom';
import { SocketProvider } from '_context/socket.context';
import DefaultLayout from './layout/default';
import Chat from './messaging/Chat';
import Rooms from './messaging/Rooms';

const Main = () => {
    return (
        <SocketProvider>
            <Routes>
                <Route path='/' element={<DefaultLayout />}>
                    <Route path='/rooms' element={<Rooms />} />
                </Route>
                <Route path='/room' element={<Chat />} />
            </Routes>
        </SocketProvider>
     );
}
 
export default Main;