import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons'; 

import styles from './style';
import SearchResult from '../../components/SearchResult';
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
        const res = await api.get('/user');
        const users = res.data.filter(user => (user.location.city == locationParam));
        setResults([...users]);
        setLoading(false);
    }
    if(loading) {
        return (
            <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
                <ActivityIndicator size='large' color='#999'/>
            </View>
        )
    }

    function renderItem({item}) {
        return <SearchResult id={item._id} photo={item.photoUrl} username={item.nickname} location={item.location.district}/>
    }

    handleRefresh = () => {
        setRefreshing(true);
        loadPublications();
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}>
                    <Entypo name='arrow-bold-left' color={'black'} size={46}/>
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