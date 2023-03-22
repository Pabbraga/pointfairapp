import React from 'react-native';
import { StatusBar } from 'react-native';
import { View, Text, Image, SafeAreaView } from 'react-native';
import styles from './style';

import Postagem from '../../components/Postagem';

export default function Home() {
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar 
            barStyle = "dark-content"
            hidden = {false}
            backgroundColor = "white"
            translucent = {false}
            networkActivityIndicatorVisible = {true}
            currentHeight={}    
            />
            <View style={styles.header}>
                <Image style={styles.userPhoto} source={require('../../components/florista.jpg')}/>
            </View>
            <View style={styles.main}>
                <Postagem />
            </View>
        </SafeAreaView>
    );
}