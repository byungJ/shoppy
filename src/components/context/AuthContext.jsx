import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { login, logout, onUserStateChange } from '../../api/firebase';

const AuthContext = createContext();

export function AuthContextProvider({children}) {
    const [userState, setUserState] = useState();

    useEffect(() => {
        onUserStateChange((user) => {
            console.log(user)
            setUserState(user)
        })
    }, []);


    // {userState, login: login, logout: logout}
    // login, logout 함수도 축약
    return <AuthContext.Provider value={{userState, login, logout}}>
        {children}
    </AuthContext.Provider>
}

export function useAuthContext() {
    return useContext(AuthContext);
}