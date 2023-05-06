import React from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native';

import styles from './style';

export default function Welcome({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#CE6A85' translucent={false}/>
            <Image
                style={styles.imgLogo}
                source={require('../../../assets/logo.png')}
            />
            <Text style={styles.logo}>PointFair</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Login')}}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Register')}}>
                <Text style={styles.buttonText}>Cadastre-se</Text>
                </TouchableOpacity>
            </View>
        </View>
  );
}