import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './style';
import SearchResult from '../../components/SearchResult';

export default function Location({ route }) {

    const { locationParam } = route.params;

    var results = [];

    const usersData = [
        {
           id: 1,
           name: "JuliaRosas",
           photo: require('../../../assets/florista.jpg'),
           location: "Embu das Artes"
        },
        {
            id: 2,
            name: "ClaudiaDosLivros",
            photo: require('../../../assets/bibliotecaria.jpg'),
            location: "Paulista"
        },
        {
            id: 3,
            name: "CraftyLeticia",
            photo: require('../../../assets/artesa.jpg'),
            location: "Taboão da Serra"
        }
    ];

    usersData.forEach(user => {
        if(locationParam === user['location']) {
            results.push(user);
        }
    });

    function renderItem({item: {photo, name, location}}) {
        return <SearchResult photo={photo} username={name} location={location}/>
    }

    return(
        <SafeAreaView style={styles.container}>
            <FlatList
                keyExtractor={(item) => item.id}
                data={results}
                renderItem={renderItem}
            />
        </SafeAreaView>
    );
}