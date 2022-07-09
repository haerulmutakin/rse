import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCircle, faSquare } from '@fortawesome/free-solid-svg-icons';
import ProtectedRoute from './_helpers/RouteGuard';
import Login from './components/Login';
import ChildRoute from './components/ChildRoute';

const Main = () => {
    return ( 
        <div className="frame">
            <div className="frame-header"></div>
            <div className="frame-body">
                <Router>
                    <Routes>
                        <Route 
                            path='*' 
                            element={
                                <ProtectedRoute>
                                    <ChildRoute />
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
            <div className="frame-footer">
                <div><FontAwesomeIcon icon={faSquare} /> </div>
                <div><FontAwesomeIcon icon={faCircle} /></div>
                <div><FontAwesomeIcon icon={faAngleRight} /> </div>
            </div>
        </div>
     );
}
 
export default Main;