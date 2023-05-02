import { createContext } from 'react';
import * as auth from '../services/auth.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    async function signIn() {
        const response = await auth.signIn();
        console.log(response);
    }
    return(
        <AuthContext.Provider value={{signIn}}>
            {children}
        </AuthContext.Provider>
    )
 
};

export default AuthContext;