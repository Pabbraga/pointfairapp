import { useContext, createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as auth from '../services/auth.js';
import api from '../services/api.js';
import LoadingScreen from '../components/LoadingScreen.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadStoragedData() {
            const storagedUser = await AsyncStorage.getItem('@PointFairAuth:user');
            const storagedToken = await AsyncStorage.getItem('@PointFairAuth:token');
            if(storagedUser && storagedToken) {
                setLoading(true);
                api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;

                setUser(JSON.parse(storagedUser));
                setLoading(false);
            }
        }

        loadStoragedData();
    }, [])

    async function signIn(email, password, signed) {
        setError(null);
        setLoading(true);
        const response = await auth.signIn(email, password, signed);
        if(!response.user) {
            setLoading(false);
            setError(response);
            console.log(response);
            return;
        }
        setUser(response.user);
        api.defaults.headers['Authorization'] = `Bearer ${response.token}`;
        await AsyncStorage.setItem('@PointFairAuth:user', JSON.stringify(response.user));
        await AsyncStorage.setItem('@PointFairAuth:token', response.token);
        setLoading(false);
    }

    function signOut() {
        AsyncStorage.clear();
        setUser(null);
    }

    async function reloadUser(email, password, signed) {
        signOut();
        await signIn(email, password, signed);
    }

    if(loading) {
        return(
            <LoadingScreen/>
        )
    }

    return(
        <AuthContext.Provider value={{signed: !!user, user, signIn, signOut, reloadUser, error}}>
            {children}
        </AuthContext.Provider>
    )
};

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
};