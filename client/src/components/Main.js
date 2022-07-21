import { Routes, Route } from 'react-router-dom';
import DefaultLauyout from './layout/Default';
import DetailLauyout from './layout/Detail';
import ProtectedRoute from '../_helpers/RouteGuard';
import {SocketProvider} from '../_context/SocketContext';
import {UserProvider} from '../_context/UserContext';
import AddQuote from './AddQuote';
import Notification from './Notification';
import Message from './Message';
import Home from './Home';
import Comment from './Comment';
import Like from './Like';
import Room from './Room';

const Main = () => {
    return ( 
        <UserProvider>
            <SocketProvider>
                <Routes>
                    <Route path='/' element={<ProtectedRoute><DefaultLauyout></DefaultLauyout></ProtectedRoute>}>
                        <Route exact path='/' element={<Home />} />
                        <Route path='/notifications' element={<Notification />} />
                        <Route path='/message' element={<Message />} />
                        <Route path='/new-quote' element={<AddQuote />} />
                    </Route>
                    <Route path='/detail' element={<ProtectedRoute><DetailLauyout /></ProtectedRoute>}>
                        <Route path='comments/:id' element={<Comment />} />
                        <Route path='likes/:id' element={<Like />} />
                    </Route>
                    <Route path='/room/:id' element={<ProtectedRoute><Room /></ProtectedRoute>} />
                </Routes>
            </SocketProvider>
        </UserProvider>
     );
}
 
export default Main;