import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import styles from './style';
import { useAuth } from '../../context/auth';

export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const { signIn, signed, error } = useAuth();

    const handleLogin = () => {
        if(!email && !password) {
            setErrors({both:"Preencha os campos acima."});
            return;
        }
        if(!email) {
            setErrors({email:"Preencha o campo de e-mail."});
            return;
        }
        if(!password) {
            setErrors({password:"Preencha o campo de senha."});
            return;
        }
        signIn(email.trim(), password.trim(), signed).catch((err)=>{
            setErrors({err})
            return;
        });
        setErrors(null);
    };

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='#FFC15E' translucent={false}/>
            <View style={styles.form}>
                <Text style={styles.h1}>Entrar</Text>
                <View style={styles.group}>
                    <Text  style={styles.p}>E-mail</Text>
                    <TextInput style={styles.input} onChangeText={setEmail} value={email} inputMode='email'/>
                    {error && <Text style={styles.labelError}>{error.email}</Text>}
                    {errors && <Text style={styles.labelError}>{errors.email}</Text>}
                </View>
                <View style={styles.group}>
                    <Text  style={styles.p}>Senha</Text>
                    <TextInput style={styles.input} onChangeText={setPassword} value={password} secureTextEntry={true}/>
                    {errors && <Text style={styles.labelError}>{errors.both}</Text>}
                    {error && <Text style={styles.labelError}>{error.password}</Text>}
                    {errors && <Text style={styles.labelError}>{errors.password}</Text>}
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