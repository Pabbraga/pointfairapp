import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import styles from './style';
import { useAuth } from '../../context/auth';

export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const { signIn, signed } = useAuth();

    const handleLogin = async () => {
        setErrors(null);
        if(!email && !password) {
            setErrors({both:"Preencha os campos acima"});
            return;
        }
        if(!email) {
            setErrors({email:"Preencha o campo de e-mail"});
            return;
        }
        if(!password) {
            setErrors({password:"Preencha o campo de senha"});
            return;
        }
        const res = await signIn(email.trim(), password.trim(), signed);
        if(res.email) {
            setErrors({email: res.email});
            return;
        }
        if(res.password) {
            setErrors({password: res.password});
            return;
        }
    };

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='#FFC15E' translucent={false}/>
            <View style={styles.form}>
                <Text style={styles.h1}>Entrar</Text>
                <View style={styles.group}>
                    <Text  style={styles.p}>E-mail</Text>
                    <TextInput style={styles.input} onChangeText={setEmail} value={email} inputMode='email'/>
                    {errors && <Text style={styles.labelError}>{errors.email}</Text>}
                </View>
                <View style={styles.group}>
                    <Text  style={styles.p}>Senha</Text>
                    <TextInput style={styles.input} onChangeText={setPassword} value={password} secureTextEntry={true}/>
                    {errors && <Text style={styles.labelError}>{errors.password}</Text>}
                    {errors && <Text style={styles.labelError}>{errors.both}</Text>}
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