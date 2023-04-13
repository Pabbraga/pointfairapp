import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import styles from './style'
import SearchResult from '../../components/SearchResult';

export default function Search() {
    const [searchString, setSearchString] = useState('');

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.searchSection}>
                <TextInput
                    style={styles.input}
                    placeholder="Buscar"
                    underlineColorAndroid="transparent"
                    onChangeText={(value)=>{setSearchString(value)}}
                />
                <Entypo name={'magnifying-glass'} color={'grey'} size={36}/>
            </View>
            <View style={styles.main}>
                <SearchResult
                username={'JuliaRosas'}
                photo={require('../../../assets/florista.jpg')}
                location={'Embu das Artes'} 
                />
            </View>
        </SafeAreaView>
    )
}