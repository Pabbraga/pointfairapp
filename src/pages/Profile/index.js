import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons'; 
import axios from 'axios';
import styles from './style';

export default function Profile({navigation}) {
    const [usuario, setUsuario] = useState([]);
    const id = "64504f18617dbaa7a94de644";

    const getUsuario = async () => {
        try {
            const res = await axios.get(`http://10.0.2.2:8000/user/${id}`);
            setUsuario(res.data);
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        getUsuario();
    }, [setUsuario]);
    
    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{position: 'absolute', top: 20, left: 20}}
            >
                <Entypo name='arrow-with-circle-left' color={'black'} size={46}/>
            </TouchableOpacity>
            <View style={styles.perfil}>
                <Image style={styles.userPhoto} source={require('../../../assets/user_img/picture.jpg')}/>
                <Text style={styles.h1}>{usuario['nmUser']}</Text>

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
                    <Image style={styles.productphoto} source={require('../../../assets/img/rosaAmarela.jpg')}/>
                    <Image style={styles.productphoto} source={require('../../../assets/img/rosaVermelha.jpg')}/>
                </View>

                <View>
                    <Image style={styles.productphoto} source={require('../../../assets/img/girassol.jpg')}/>
                    <Image style={styles.productphoto} source={require('../../../assets/img/gerberaPink.jpg')}/>
                </View>
            </View>
        </SafeAreaView>
    );
}