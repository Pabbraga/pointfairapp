//import React from 'react-native';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import styles from './style';

export default function Login({navigation}) {
    const [login, setLogin] = React.useState('Login');
    const [link, setLink] = React.useState('Sou um vendedor');
    const [usuario, setUsuario ] = React.useState('Usuário')
    const handlePress = () => {
        if(link === 'Sou um cliente') {
            setLogin('Login');
            setLink('Sou um vededor');
            setUsuario('Usuário')
        } else {
            setLogin('Login vendedor');
            setLink('Sou um cliente');
            setUsuario('CNPJ')
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
                
                <View style={styles.group}>
                    <Text style={styles.p}>{usuario}</Text>
                    <TextInput style={styles.input}/>
                </View>

                <View style={styles.group}>
                    <Text  style={styles.p}>Senha</Text>
                    <TextInput style={styles.input}/>
                </View>             
                <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Tabs')}}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.opacity} onPress={()=>{navigation.navigate('Password')}}>
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