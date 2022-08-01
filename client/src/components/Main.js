import {Routes, Route} from 'react-router-dom';
import { AppProvider } from '_context/App.context';
import DefaultLayout from './layout/default';
import Chat from './messaging/Chat';
import Friends from './messaging/Friends';
import Rooms from './messaging/Rooms';

const Main = () => {
    return (
        <AppProvider>
            <Routes>
                <Route path='/' element={<DefaultLayout />}>
                    <Route path='/rooms' element={<Rooms />} />
                </Route>
                <Route path='/room/:id' element={<Chat />} />
                <Route path='/friends' element={<Friends />} />
            </Routes>
        </AppProvider>
     );
}
 
export default Main;