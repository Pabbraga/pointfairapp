import React from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 

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
            />
            <View style={styles.header}>
                <Entypo name="menu" size={50} color="black" style={{margin: 12}}/>
                <TouchableOpacity>
                    <Image style={styles.userPhoto} source={require('../../../assets/florista.jpg')}/>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollView} horizontal={false} showsHorizontalScrollIndicator={false}>
                <View style={styles.main}>
                    <Postagem
                    photo={require('../../../assets/florista.jpg')} 
                    username={'JuliaRosas'} 
                    content={require('../../../assets/floricultura.jpg')}
                    location={'Embu das Artes - Feira de Flores'}
                    />
                    <Postagem
                    photo={require('../../../assets/bibliotecaria.jpg')}
                    username={'ClaudiaDosLivros'} 
                    content={require('../../../assets/livros.jpg')}
                    location={'Santana - Feira de Livros'}
                    />
                    <Postagem
                    photo={require('../../../assets/artesa.jpg')}
                    username={'CraftyLeticia'} 
                    content={require('../../../assets/artesanato.jpeg')}
                    location={'Taboão da Serra - Feira de Artesanato'}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}