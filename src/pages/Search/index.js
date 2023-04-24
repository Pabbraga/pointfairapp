import React, { useState } from 'react';
import { View, TextInput, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import styles from './style';
import LocationTemplate from '../../components/LocationTemplate';

export default function Search() {
    const [searchString, setSearchString] = useState('');

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.searchSection}>
                <Entypo name={'magnifying-glass'} color={'#FCDC5D'} size={38} style={{marginTop: 10}}/>
                <TextInput
                    style={styles.input}
                    placeholder="Buscar"
                    underlineColorAndroid="transparent"
                    onChangeText={(value)=>{setSearchString(value)}}
                    value={searchString}
                />
            </View>
            <ScrollView style={styles.main}>
                <LocationTemplate image={require('../../../assets/location_img/taboao.png')} location={'Taboão da Serra'} city={'Taboão da Serra'}/>
                <LocationTemplate image={require('../../../assets/location_img/paulista.png')} location={'Paulista'} city={'Paulista'}/>
                <LocationTemplate image={require('../../../assets/location_img/embu.png')} location={'Embu das Artes'} city={'Embu das Artes'}/>
                <LocationTemplate image={require('../../../assets/location_img/eldorado.png')} location={'Eldorado'} city={''}/>
            </ScrollView>
        </SafeAreaView>
    )
}