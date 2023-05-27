import React from 'react-native';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Publish(props) {
    const navigation = useNavigation();

    const id = props.id;
    const userImages = require.context('../../assets/user_img', true);
    let photos = userImages(`./${props.photo}`);
    
    const contentImageUrl = `https://drive.google.com/uc?export=view&id=${props.content}`;

    return(
    <View style={styles.container}>
        <View style={styles.userField}>
            <TouchableOpacity onPress={()=>{navigation.navigate('Profile', {idUser: id})}}>
                <Image style={styles.userPhoto} source={photos}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('Profile', {idUser: id})}}>
                <Text style={styles.userName}>{props.username}</Text>
            </TouchableOpacity>
        </View>
        <Image style={styles.image} source={{uri:contentImageUrl}}/>
        <Text style={styles.location}>{props.location}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 14,
    },
    userField: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    userPhoto: {
        width: 45,
        height: 45,
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