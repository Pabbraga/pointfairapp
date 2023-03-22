import React from 'react-native';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Postagem() {
    return(
    <View>
        <View style={styles.userField}>
            <Image style={styles.userPhoto} source={require('./florista.jpg')}/>
            <Text style={styles.userName}>HeloCrafty</Text>
        </View>
        <Image style={styles.image} source={require('./floricultura.jpg')}/>
        <Text style={styles.location}>Feira de artesanato - Largo do Taboão</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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