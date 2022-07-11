import { Routes, Route } from 'react-router-dom';
import DefaultLauyout from './layout/Default';
import DetailLauyout from './layout/Detail';
import Home from './Home';
import Comment from './Comment';
import Like from './Like';
import ProtectedRoute from '../_helpers/RouteGuard';
import SocketContext, {socket} from '../_context/SocketContext';



const ChildRoute = () => {
    return ( 
        <SocketContext.Provider value={socket}>
            <Routes>
                <Route path='/' element={
                    <ProtectedRoute>
                        <DefaultLauyout><Home /></DefaultLauyout>
                    </ProtectedRoute>
                    } />
                <Route path='/detail' element={<ProtectedRoute><DetailLauyout /></ProtectedRoute>}>
                    <Route path='comments/:id' element={<Comment />} />
                    <Route path='likes/:id' element={<Like />} />
                </Route>
            </Routes>
        </SocketContext.Provider>
     );
}
 
export default ChildRoute;