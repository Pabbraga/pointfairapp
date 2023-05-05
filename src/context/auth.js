import { useContext, createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as auth from '../services/auth.js';
import api from '../services/api.js';
import { Alert } from 'react-native';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function loadStoragedData() {
            const storagedUser = await AsyncStorage.getItem('@PointFairAuth:user');
            const storagedToken = await AsyncStorage.getItem('@PointFairAuth:token');
            
            if(storagedUser && storagedToken) {
                api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;

                setUser(JSON.parse(storagedUser));
            }
        }

        loadStoragedData();
    }, [])

    async function signIn(email, password) {
        const response = await auth.signIn(email, password);
        if(!response.user) {
            Alert.alert('Erro', `${response}`);
            return;
        }
        setUser(response.user);

        api.defaults.headers['Authorization'] = `Bearer ${response.token}`;

        await AsyncStorage.setItem('@PointFairAuth:user', JSON.stringify(response.user));
        await AsyncStorage.setItem('@PointFairAuth:token', response.token);
    }

    function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        });
    }
    return(
        <AuthContext.Provider value={{signed: !!user, user, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
 
};

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
};