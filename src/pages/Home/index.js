import React from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { View, Image, SafeAreaView, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import { TextInput } from 'react-native-gesture-handler';

import styles from './style';
import Publish from '../../components/Publish';
import { useAuth } from '../../context/auth';
import PublishContainer from '../../components/PublishContainer';

export default function Home({navigation }) {
    const userType = "seller";
    const { user } = useAuth();
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