import { Routes, Route } from 'react-router-dom';
import DefaultLauyout from './layout/Default';
import DetailLauyout from './layout/Detail';
import Home from './Home';

const ChildRoute = () => {
    return ( 
        <Routes>
            <Route path='/' element={<DefaultLauyout><Home /></DefaultLauyout>} />
            <Route path='/comments/:id' element={<DetailLauyout />} />
            <Route path='/likes/:id' element={<DetailLauyout />} />
        </Routes>
     );
}
 
export default ChildRoute;