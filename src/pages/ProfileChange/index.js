import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons'; 
import PickPhoto from '../../components/PickPhoto';
import styles from './style';
import { useAuth } from '../../context/auth';

export default function ProfileChange({navigation}) {
    const { user } = useAuth();

    return(
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='#CE6A85' translucent={false}/>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{position: 'absolute', top: 30, left: 20}}>
                <Entypo name='arrow-with-circle-left' color={'black'} size={46}/>
            </TouchableOpacity>
            <Text style={styles.title}>Editar perfil</Text>
            <View style={styles.form}>
                <PickPhoto />
                <TextInput style={styles.textInput} placeholder={user.nickname}/>
                <TextInput style={styles.textInput} placeholder={user.email}/>
                <TextInput style={styles.textInput} placeholder={user.password}/>
                <TextInput style={styles.textInput} placeholder={user.phone}/>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Concluído</Text>
                </TouchableOpacity>                
            </View>
        </SafeAreaView>
    );
}