import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons'; 
import styles from './style';
import { StatusBar } from 'expo-status-bar';
import { TextInput } from 'react-native-gesture-handler';
import { useAuth } from '../../context/auth';

export default function ProfileChange({navigation}) {
    const { user } = useAuth(); 
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='#CE6A85' translucent={false}/>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{position: 'absolute', top: 20, left: 20}}>
                <Entypo name='arrow-with-circle-left' color={'black'} size={46}/>
            </TouchableOpacity>
            <Text style={styles.title}>Editar perfil</Text>
            <View style={styles.form}>
                <Image style={styles.userPhoto} source={require('../../../assets/user_img/picture.jpg')}/>
                <View style={styles.photoFilter}>
                    <Entypo name='camera' color={'black'} size={30}/>
                </View>
                <TextInput style={styles.textInput} placeholder={user.nmUser}/>
                <TextInput style={styles.textInput} placeholder={user.email}/>
                <TextInput style={styles.textInput} placeholder='*****'/>
                <TextInput style={styles.textInput} placeholder={user.phone}/>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Concluído</Text>
                </TouchableOpacity>                
            </View>
        </SafeAreaView>
    );
}