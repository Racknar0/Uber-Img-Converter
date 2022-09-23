import { useMemo } from 'react';
import { useCallback } from 'react';
import { createContext, useState } from 'react';

const MY_AUTH_APP = 'MY_AUTH_APP_1';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('MY_AUTH_APP_1') ?? false

    );

    const login = useCallback(function () {
        setIsAuthenticated(true);
        window.localStorage.setItem(MY_AUTH_APP, true);
    }, []);

    const logout = useCallback(function () {
        setIsAuthenticated(false);
        window.localStorage.removeItem(MY_AUTH_APP);
    }, []);

    const value = useMemo(
        () => ({
            isAuthenticated,
            login,
            logout,
        }),
        [isAuthenticated, login, logout]
    );

    return (
        <AuthContext.Provider
            value={value}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
