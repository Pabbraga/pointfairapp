import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, SafeAreaView, TouchableOpacity, Text, ScrollView } from 'react-native';
// import * as FileSystem from 'expo-file-system';

import api from '../../services/api';

import styles from './style';
import Publish from '../../components/Publish';
import { useAuth } from '../../context/auth';
import PublishContainer from '../../components/PublishContainer';
import { useEffect } from 'react';

export default function Home({navigation}) {
    const userType = "seller";
    const { user } = useAuth();
    // const [data, setData] = useState(null);

    // const getData = async () => {
    //     FileSystem.downloadAsync(
    //         'http://techslides.com/demos/sample-videos/small.mp4',
    //         FileSystem.documentDirectory + 'small.mp4'
    //     )
    // }

    // useEffect(() => {
    //     getData();
    // }, []);

    return(
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='#CE6A85' translucent={false}/>
            <View style={styles.header}>
                <Text style={styles.logoMark}>PointFair</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate('Profile')}}>
                    <Image style={styles.userPhoto} source={require('../../../assets/user_img/picture.jpg')}/>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollView} horizontal={false} showsVerticalScrollIndicator={false}>
                {userType === 'seller' && (
                    <PublishContainer/>
                )}
                <View style={styles.main}>
                    <Publish
                    photo={require('../../../assets/user_img/florista.jpg')} 
                    username={'JuliaRosas'} 
                    content={require('../../../assets/img/floricultura.jpg')}
                    location={'Embu das Artes - Feira de Flores'}
                    />
                    <Publish
                    photo={require('../../../assets/user_img/bibliotecaria.jpg')}
                    username={'ClaudiaDosLivros'} 
                    content={require('../../../assets/img/livros.jpg')}
                    location={'Santana - Feira de Livros'}
                    />
                    <Publish
                    photo={require('../../../assets/user_img/artesa.jpg')}
                    username={'CraftyLeticia'} 
                    content={require('../../../assets/img/artesanato.jpeg')}
                    location={'Taboão da Serra - Feira de Artesanato'}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}