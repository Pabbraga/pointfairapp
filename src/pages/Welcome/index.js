import React from 'react-native';
import { StatusBar } from 'react-native-web';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native';

import styles from './style';

export default function Welcome() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
            barStyle = "dark-content"
            hidden = {false}
            backgroundColor = "white"
            translucent = {false}
            networkActivityIndicatorVisible = {true}
            />
            <Image
                style={styles.imgLogo}
                source={require('../../../assets/logoTemporaria.png')}
            />
            <Text style={styles.logo}>PointFair</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Cadastre-se</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
  );
}