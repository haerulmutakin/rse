import { Routes, Route } from 'react-router-dom';
import DefaultLauyout from './layout/Default';
import DetailLauyout from './layout/Detail';
import Home from './Home';
import Comment from './Comment';
import Like from './Like';
import ProtectedRoute from '../_helpers/RouteGuard';
import {SocketProvider} from '../_context/SocketContext';
import {UserProvider} from '../_context/UserContext';
import AddQuote from './AddQuote';
import Notification from './Notification';

const Main = () => {
    return ( 
        <UserProvider>
            <SocketProvider>
                <Routes>
                    <Route path='/' element={
                        <ProtectedRoute>
                            <DefaultLauyout><Home /></DefaultLauyout>
                        </ProtectedRoute>
                        } />
                    <Route path='/detail' element={<ProtectedRoute><DetailLauyout /></ProtectedRoute>}>
                        <Route path='comments/:id' element={<Comment />} />
                        <Route path='likes/:id' element={<Like />} />
                        <Route path='new' element={<AddQuote />} />
                        <Route path='notification' element={<Notification />} />
                    </Route>
                </Routes>
            </SocketProvider>
        </UserProvider>
     );
}
 
export default Main;