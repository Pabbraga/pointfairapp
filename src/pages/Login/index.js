//import React from 'react-native';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import styles from './style';

export default function Login({navigation}) {
    const [login, setLogin] = useState('Login');
    const [link, setLink] = useState('Sou um vendedor');
    const [isSeller, setIsSeller] = useState(false);
    const [isUser, setIsUser] = useState(true);

    const [user, setUser] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if(isUser && user === 'felipe' && password === '1234'){
            userType = user
            navigation.navigate('HomeTabs');
        } else if (isSeller && cnpj === '12345678912' && password === '2345'){
            navigation.navigate('HomeTabs');
        }
    }

    const handlePress = () => {
        if(link === 'Sou um cliente') {
            setLogin('Login');
            setLink('Sou um vededor');
            setIsSeller(false);
            setIsUser(true);
        } else {
            setLogin('Login vendedor');
            setLink('Sou um cliente');
            setIsSeller(true);
            setIsUser(false)
        }
    } 

    return(
        <View style={styles.container}>
            <StatusBar 
            barStyle = "dark-content"
            hidden = {false}
            backgroundColor = "white"
            translucent = {false}
            networkActivityIndicatorVisible = {true}
            />
            <View style={styles.top}>
                <LinearGradient style={[styles.circulo]}
                    start={{x:1,y:1}}
                    end={{x:0,y:0}} 
                    locations={[0.5,.9]}
                    colors={['#FFC15E', '#CE6A85']}>
                </LinearGradient>
                <LinearGradient style={styles.circulo}
                    start={{x:0,y:1}}
                    end={{x:1,y:0}} 
                    locations={[0.5,.9]}
                    colors={['#FFC15E', '#CE6A85']}>
                </LinearGradient>
            </View>
            <View style={styles.form}>
                <Text style={styles.h1}>{login}</Text>
                
                {isSeller && (
                    <View style={styles.group}>
                        <Text  style={styles.p}>CNPJ</Text>
                        <TextInput style={styles.input}  onChangeText={setCnpj}/>
                    </View>
                )}

                {isUser && (
                    <View style={styles.group}>
                        <Text  style={styles.p}>Usuário</Text>
                        <TextInput style={styles.input}  onChangeText={setUser}/>
                    </View>
                    )}

                <View style={styles.group}>
                    <Text  style={styles.p}>Senha</Text>
                    <TextInput style={styles.input}  onChangeText={setPassword}/>
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

                <TouchableOpacity style={styles.opacity} onPress={handlePress}>
                    <Text style={styles.link}>{link}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.top}>
            <LinearGradient style={styles.circulo}
                start={{x:1,y:0}}
                end={{x:0,y:1}} 
                locations={[0.5,.9]}
                colors={['#FFC15E', '#CE6A85']}>
            </LinearGradient>
            <LinearGradient style={styles.circulo}
                start={{x:0,y:0}}
                end={{x:1,y:1}} 
                locations={[0.5,.9]}
                colors={['#FFC15E', '#CE6A85']}>
            </LinearGradient>
            </View>
        </View>
    );
}