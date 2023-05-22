import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import styles from './style';
import { useAuth } from '../../context/auth';

export default function Login({navigation}) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, error } = useAuth();

    const handleLogin = () => {
        signIn(user, password);
    };

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='#FFC15E' translucent={false}/>
            <View style={styles.form}>
                <Text style={styles.h1}>Entrar</Text>
                <View style={styles.group}>
                    <Text  style={styles.p}>E-mail</Text>
                    <TextInput style={styles.input} onChangeText={setUser} value={user}/>
                    {error && <Text style={styles.labelError}>{error.email}</Text>}
                </View>
                <View style={styles.group}>
                    <Text  style={styles.p}>Senha</Text>
                    <TextInput style={styles.input} onChangeText={setPassword} value={password}/>
                    {error && <Text style={styles.labelError}>{error.password}</Text>}
                </View>        
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.opacity} onPress={()=>{navigation.navigate('ForgotPassword')}}>
                    <Text style={styles.link}>Esqueci minha senha</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.opacity} onPress={()=>{navigation.navigate('Register')}}>
                    <Text style={styles.link}>Não possuo uma conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}