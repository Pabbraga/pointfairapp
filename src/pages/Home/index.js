import React from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { View, Image, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 

import styles from './style';
import Publish from '../../components/Publish';
import { TextInput } from 'react-native-gesture-handler';

export default function Home({navigation, route }) {
    const { userType } = route.params;

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Entypo name="menu" size={50} color="black" style={{margin: 12}}/>
                <TouchableOpacity onPress={()=>{navigation.navigate('Profile')}}>
                    <Image style={styles.userPhoto} source={require('../../../assets/florista.jpg')}/>
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
                    photo={require('../../../assets/florista.jpg')} 
                    username={'JuliaRosas'} 
                    content={require('../../../assets/floricultura.jpg')}
                    location={'Embu das Artes - Feira de Flores'}
                    />
                    <Publish
                    photo={require('../../../assets/bibliotecaria.jpg')}
                    username={'ClaudiaDosLivros'} 
                    content={require('../../../assets/livros.jpg')}
                    location={'Santana - Feira de Livros'}
                    />
                    <Publish
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