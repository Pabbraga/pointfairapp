import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons'; 
import styles from './style';
import { TextInput } from 'react-native-gesture-handler';

export default function ProfileChange({navigation}) {
    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{position: 'absolute', top: 20, left: 20}}>
                <Entypo name='arrow-with-circle-left' color={'black'} size={46}/>
            </TouchableOpacity>
            <Text style={styles.title}>Editar perfil</Text>
            <View style={styles.form}>
                <Image style={styles.userPhoto} source={require('../../../assets/florista.jpg')}/>
                <View style={styles.photoFilter}>
                    <Entypo name='camera' color={'black'} size={30}/>
                </View>
                <TextInput style={styles.textInput} placeholder='JuliaRosas'/>
                <TextInput style={styles.textInput} placeholder='juliarosas@gmail.com'/>
                <TextInput style={styles.textInput} placeholder='*****'/>
                <TextInput style={styles.textInput} placeholder='(11)93245-6578'/>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Concluído</Text>
                </TouchableOpacity>                
            </View>
        </SafeAreaView>
    );
}