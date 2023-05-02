import React from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LocationTemplate(props) {
    const navigation = useNavigation();
    return(
    <TouchableOpacity style={styles.container} onPress={()=>{navigation.navigate("Location", { locationParam: props.location })}}>
        <Image style={styles.imageLocation} source={props.image}></Image>
        <Text style={styles.textLocation}>{props.location}</Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25
    },
    imageLocation: {
        resizeMode: 'cover',
        width: 275,
        height: 114,
        borderRadius: 10
    },
    textLocation: {
        position: 'absolute',
        fontSize: 22,
        color: '#FFF',
        fontWeight: '500',
    },
});