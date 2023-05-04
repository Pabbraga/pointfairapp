//import React from 'react-native';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import axios from "axios";

import styles from './style';
import AuthContext from '../../context/auth';

export default function Login({navigation}) {
    const [typeLogin, setTypeLogin] = useState('Login');
    const [link, setLink] = useState('Sou um vendedor');
    const [isSeller, setIsSeller] = useState(false);
    const [isUser, setIsUser] = useState(true);

    const [user, setUser] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [password, setPassword] = useState('');

    const handlePress = () => {
        if(link === 'Sou um cliente') {
            setTypeLogin('Login');
            setLink('Sou um vededor');
            setIsSeller(false);
            setIsUser(true);
        } else {
            setTypeLogin('Login vendedor');
            setLink('Sou um cliente');
            setIsSeller(true);
            setIsUser(false)
        }
    }

    const { data, signIn } = useContext(AuthContext);
    const handleLogin = async () => {
        
        try {
            const res = await axios.get('http://10.0.2.2:8000/user');
            const usersData = res.data;
            usersData.forEach(userData => {
                if(typeof user === undefined || typeof cnpj === undefined || typeof password === undefined) {
                    alert("Preencha todos os campos.");
                    return;
                } else if(userData["password"] !== password) {
                    alert("Dados incorretos e/ou inválidos.");
                    return;
                } else {
                    if(isSeller) {
                        navigation.navigate('HomeTabs', {screen: 'Home', params: { userType: 'seller' }});
                        return;
                    }
                    navigation.navigate('HomeTabs', {screen: 'Home', params: { userType: 'user' }});
                    signIn();
                    return;
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    return(
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.h1}>{typeLogin}</Text>
                
                {isSeller && (
                    <View style={styles.group}>
                        <Text style={styles.p}>CNPJ</Text>
                        <TextInput style={styles.input} onChangeText={setCnpj}/>
                    </View>
                )}

                {isUser && (
                    <View style={styles.group}>
                        <Text  style={styles.p}>Usuário</Text>
                        <TextInput style={styles.input} onChangeText={setUser}/>
                    </View>
                    )}

                <View style={styles.group}>
                    <Text  style={styles.p}>Senha</Text>
                    <TextInput style={styles.input} onChangeText={setPassword}/>
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

                <TouchableOpacity style={styles.opacity} onPress={(handlePress)}>
                    <Text style={styles.link}>{link}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}