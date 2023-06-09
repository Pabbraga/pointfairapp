import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons'; 

import styles from './style';
import SearchResult from '../../components/SearchResult';
import LoadingScreen from '../../components/LoadingScreen';
import api from '../../services/api';

export default function Location({ navigation, route }) {
    const { locationParam } = route.params;
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadResults();
    }, []);

    async function loadResults() {
        try {
            const res = await api.get('/user');
            const users = res.data.filter(user => (user.location.city == locationParam));
            setResults(users);
            setLoading(false);
            setRefreshing(false);
        } catch (err) {
            Alert.alert(err.response.data)
        }
    }
    if(loading) {
        return(
            <LoadingScreen />
        )
    }

    function renderItem({item}) {
        return (
        <SearchResult 
            item={item}
        />
        )
    }

    handleRefresh = () => {
        setRefreshing(true);
        loadResults();
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}>
                    <Entypo name='arrow-bold-left' color={'#5C374C'} size={46}/>
                </TouchableOpacity>
                <Text style={styles.logoMark}>{locationParam}</Text>
            </View>
            <FlatList
                keyExtractor={(item) => item._id}
                data={results}
                renderItem={renderItem}
                refreshing={refreshing}
                onRefresh={handleRefresh}
            />
        </SafeAreaView>
    );
}