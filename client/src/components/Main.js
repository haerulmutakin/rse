import { Fragment } from 'react';
import {Routes, Route} from 'react-router-dom';
import DefaultLayout from './layout/default';
import Chat from './messaging/Chat';
import Rooms from './messaging/Rooms';

const Main = () => {
    return (
        <Fragment>
            <Routes>
                <Route path='/' element={<DefaultLayout />}>
                    <Route path='/rooms' element={<Rooms />} />
                </Route>
                <Route path='/room' element={<Chat />} />
            </Routes>
        </Fragment>
     );
}
 
export default Main;