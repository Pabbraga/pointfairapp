//import React from 'react-native';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import styles from './style';
import { useAuth } from '../../context/auth';

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

    const { signed, signIn } = useAuth();

    const handleLogin = async () => {
        await signIn(user, password).then(() => {
            if(signed) {
                navigation.navigate('HomeTabs');
            } else {
                return;
            }
        });
    };
        // if(isSeller) {
        //     navigation.navigate('HomeTabs', {screen: 'Home', params: { userType: 'seller' }});
        //     return;
        // }
        // navigation.navigate('HomeTabs', {screen: 'Home', params: { userType: 'user' }});

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
                
                <Text>{signed ? "HomeTabs" : "Login"}</Text>

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