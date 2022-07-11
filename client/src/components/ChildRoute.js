import { Routes, Route } from 'react-router-dom';
import DefaultLauyout from './layout/Default';
import DetailLauyout from './layout/Detail';
import Home from './Home';
import Comment from './Comment';
import Like from './Like';
import ProtectedRoute from '../_helpers/RouteGuard';
import {SockerProvider} from '../_context/SocketContext';
import {UserProvider} from '../_context/UserContext';



const ChildRoute = () => {
    return ( 
        <UserProvider>
            <SockerProvider>
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
            </SockerProvider>
        </UserProvider>
     );
}
 
export default ChildRoute;