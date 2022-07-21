import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCircle, faSquare } from '@fortawesome/free-solid-svg-icons';
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