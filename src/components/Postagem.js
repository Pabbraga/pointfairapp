import React from 'react-native';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Postagem(props) {
    return(
    
    <View style={styles.container}>
        <View style={styles.userField}>
            <Image style={styles.userPhoto} source={props.photo}/>
            <Text style={styles.userName}>{props.username}</Text>
        </View>
        <Image style={styles.image} source={props.content}/>
        <Text style={styles.location}>{props.location}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10
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
    image: {
        width: 320,
        height: 180,
        borderRadius: 5,
    },
    location: {
        fontSize: 15,
        color: '#FFC15E',
        fontWeight: 'bold'
    },
})