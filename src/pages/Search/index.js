import React, {useState} from 'react';
import { View, TextInput, ScrollView, Alert, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import styles from './style';
import LocationTemplate from '../../components/LocationTemplate';
import SearchResult from '../../components/SearchResult';
import api from '../../services/api';

export default function Search() {
    const [isTyping, setIsTyping] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const handleSearch = async (value) => {
        if(!value) {
            setIsTyping(false);
            setSearchResults(null);
            return;
        }
        if(value.match(/^[a-zA-Z0-9]{1,}$/im)) {
            try {
                const res = await api.get(`/user/search/${value}`);
                setSearchResults(res.data);
                setIsTyping(true);
            } catch (err) {
                Alert.alert(err.response.data);
            }
        } else {
            Alert.alert("Insira apenas letras e números!");
        }
    } 

    renderItem = ({item}) => (
        <SearchResult
        item={item}
        />
    );

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.searchSection}>
                <Entypo name={'magnifying-glass'} color={'#FCDC5D'} size={38} style={{marginTop: 10}}/>
                <TextInput
                    style={styles.input}
                    placeholder="Buscar"
                    underlineColorAndroid="transparent"
                    onChangeText={(value)=> {
                        handleSearch(value)
                    }}
                    clearButtonMode='always'
                />
            </View>
            {!isTyping && <ScrollView style={styles.main}>
                <LocationTemplate image={require('../../../assets/location_img/taboao.png')} location={'Taboão da Serra'} />
                <LocationTemplate image={require('../../../assets/location_img/paulista.png')} location={'São Paulo'} />
                <LocationTemplate image={require('../../../assets/location_img/embu.png')} location={'Embu das Artes'} />
                <LocationTemplate image={require('../../../assets/location_img/eldorado.png')} location={'Eldorado'} />
            </ScrollView>}
            {isTyping && 
            <FlatList
            keyExtractor={(item) => item._id}
            data={searchResults}
            renderItem={renderItem}
            style={styles.list}
            />}
        </SafeAreaView>
    )
}