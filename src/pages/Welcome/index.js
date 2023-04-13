import React from 'react-native';
import { StatusBar } from 'react-native-web';
import { Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native';

import styles from './style';

export default function Welcome({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Image
                style={styles.imgLogo}
                source={require('../../../assets/img/logo.png')}
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
        </SafeAreaView>
  );
}