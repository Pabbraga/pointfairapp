import React from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { View, Image, SafeAreaView, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import { TextInput } from 'react-native-gesture-handler';

import styles from './style';
import Publish from '../../components/Publish';
import { useAuth } from '../../context/auth';

export default function Home({navigation, route }) {
    const userType = "seller";

    return(
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'light'} translucent={false}/>
            <View style={styles.header}>
                <Text style={styles.logoMark}>PointFair</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate('Profile')}}>
                    <Image style={styles.userPhoto} source={require('../../../assets/user_img/picture.jpg')}/>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollView} horizontal={false} showsVerticalScrollIndicator={false}>
                {userType === 'seller' && (
                    <View style={styles.makePublishSection}>
                        <TextInput
                        style={styles.publishForm} 
                        multiline
                        numberOfLines={2}
                        maxLength={60}
                        />
                        <View style={styles.publishButtons}>
                            <TouchableOpacity><Entypo name='image' color={'black'} size={28}/></TouchableOpacity>
                            <TouchableOpacity><Entypo name='location-pin' color={'black'} size={28}/></TouchableOpacity>
                            <TouchableOpacity><Entypo name='paper-plane' color={'black'} size={28}/></TouchableOpacity>
                        </View>
                    </View>
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