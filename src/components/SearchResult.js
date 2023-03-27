import React from 'react-native';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function SearchResult(props) {
    return(
    <View style={styles.container}>
        <View style={styles.userField}>
            <Image style={styles.userPhoto} source={props.photo}/>
            <Text style={styles.userName}>{props.username}</Text>
        </View>
        <Text style={styles.location}>{props.location}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        marginVertical: 10,
        marginLeft: 10,
        padding: 10,
        backgroundColor: '#985277',
        borderRadius: 10,
        shadowOffset: {width: -4, height: 4},  
        shadowColor: 'black',  
        shadowOpacity: 0.2,  
        shadowRadius: 3,  
    },
    userField: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    userPhoto: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8
    },
    userName: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold'
    },
    location: {
        fontSize: 10,
        color: '#FFC15E',
        fontWeight: 'bold'
    },
});