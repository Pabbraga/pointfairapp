import React from 'react-native';
import { StatusBar } from 'react-native';
import { View, Text, Image, SafeAreaView } from 'react-native';
import styles from './style';
import { Entypo } from '@expo/vector-icons'; 

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

            />
            <View style={styles.header}>
                <Entypo name="menu" size={50} color="black" style={{margin: 12}}/>
                <Image style={styles.userPhoto} source={require('../../../assets/florista.jpg')}/>
            </View>
            <View style={styles.main}>
                <Postagem
                photo={require('../../../assets/florista.jpg')} 
                username={'JuliaRosas'} 
                content={require('../../../assets/floricultura.jpg')}
                location={'Largo do Taboão - Feira de Flores'}
                />
                <Postagem
                photo={require('../../../assets/bibliotecaria.jpg')}
                username={'ClaudiaLivros'} 
                content={require('../../../assets/livros.jpg')}
                location={'Santana - Feira de Livros'}
                />
            </View>
        </SafeAreaView>
    );
}