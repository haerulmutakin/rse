import { createContext, useEffect, useState } from "react";
import {isAuthenticated} from '../_services/Auth.service';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const session = isAuthenticated();
        if(session) {
            setUser(session)
        }
    }, [])

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;