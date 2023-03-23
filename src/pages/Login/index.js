import React from 'react-native';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


import styles from './style';

export default function Login() {
    return(
        <View style={styles.container}>
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
                <Text style={styles.h1}>Login</Text>
                
                <View style={styles.group}>
                    <Text style={styles.p}>Usuário</Text>
                    <TextInput style={styles.input}/>
                </View>

                <View style={styles.group}>
                    <Text  style={styles.p}>Senha</Text>
                    <TextInput style={styles.input}/>
                </View>             
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.opacity}>
                    <Text style={styles.link}>Esqueci minha senha</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.opacity}>
                    <Text style={styles.link}>Não possuo uma conta</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.opacity}>
                    <Text style={styles.link}>Sou um vendedor</Text>
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