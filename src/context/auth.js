import { useContext, createContext, useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as auth from '../services/auth.js';
import api from '../services/api.js';
import { Alert } from 'react-native';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

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

    async function signIn(email, password) {
        const response = await auth.signIn(email, password);
        if(!response.user) {
            setLoading(false);
            Alert.alert('Erro', `${response}`);
            return;
        }
        setLoading(true);
        setUser(response.user);
        api.defaults.headers['Authorization'] = `Bearer ${response.token}`;
        await AsyncStorage.setItem('@PointFairAuth:user', JSON.stringify(response.user));
        await AsyncStorage.setItem('@PointFairAuth:token', response.token);
        setLoading(false);
    }

    function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        });
    }

    if(loading) {
        return (
            <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
                <ActivityIndicator size='large' color='#999'/>
            </View>
        )
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