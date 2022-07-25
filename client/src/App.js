import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './_helpers/RouteGuard';
import Login from './components/Login';
import Main from './components/Main';

const App = () => {
    return ( 
        <div className="app">
            <Router>
                <Routes>
                    <Route 
                        path='/*' 
                        element={
                            <ProtectedRoute>
                                <Main />
                            </ProtectedRoute>
                        }
                    />
                    <Route 
                        exact 
                        path='/login' 
                        element={<Login />}
                    />
                </Routes>
            </Router>
        </div>
     );
}
 
export default App;