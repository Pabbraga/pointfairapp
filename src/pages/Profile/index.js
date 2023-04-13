import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons'; 
import styles from './style';

export default function Profile({navigation}) {
    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{position: 'absolute', top: 20, left: 20}}
            >
                <Entypo name='arrow-with-circle-left' color={'black'} size={46}/>
            </TouchableOpacity>
            <View style={styles.perfil}>
                <Image style={styles.userPhoto} source={require('../../../assets/florista.jpg')}/>
                <Text style={styles.h1}>JuliaRosas</Text>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProfileChange')}>
                    <Text style={styles.buttonText}>Editar perfil</Text>
                </TouchableOpacity>

                <View style={styles.icons}>
                    <Entypo name="box" size={32} color="black" style={{ marginRight: 70 }}/>
                    <Entypo name="shop" size={32} color="black" style={{ marginRight: 70 }}/>
                    <Entypo name="calendar" size={32} color="black" />
                </View>
            </View>
        
            <View style={styles.product}>
                <View>
                    <Image style={styles.productphoto} source={require('../../../assets/rosaAmarela.jpg')}/>
                    <Image style={styles.productphoto} source={require('../../../assets/rosaVermelha.jpg')}/>
                </View>

                <View>
                    <Image style={styles.productphoto} source={require('../../../assets/girassol.jpg')}/>
                    <Image style={styles.productphoto} source={require('../../../assets/gerberaPink.jpg')}/>
                </View>
            </View>
        </SafeAreaView>
    );
}