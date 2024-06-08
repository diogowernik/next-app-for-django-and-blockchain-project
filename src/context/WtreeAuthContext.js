import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        userAddress: null,
        currentWallet: null,
        walletSpecificState: {},
    });

    const updateAuthState = (wallet, state) => {
        setAuthState((prevState) => ({
            ...prevState,
            currentWallet: wallet,
            walletSpecificState: {
                ...prevState.walletSpecificState,
                [wallet]: state,
            },
        }));
    };

    const resetAuthState = () => {
        setAuthState({
            isAuthenticated: false,
            userAddress: null,
            currentWallet: null,
            walletSpecificState: {},
        });
    };

    return (
        <AuthContext.Provider value={{ authState, updateAuthState, resetAuthState }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
