import React from 'react-native';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import styles from './style';

export default function ForgotPassword({navigation}) {
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
                <Text style={styles.h1}>Esqueci minha{'\n'}senha</Text>
                
                <Text style={styles.h2}>Digite seu E-mail</Text>
                <View style={styles.group}>
                    <Text style={styles.p}>Email</Text>
                    <TextInput style={styles.input}/>
                </View>
                
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Enviar</Text>
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