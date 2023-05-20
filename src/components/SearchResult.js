import React from 'react-native';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SearchResult(props) {
    const navigation = useNavigation();
    const userImages = require.context('../../assets/user_img', true);
    let photos = userImages(`./${props.photo}`);
    return(
    <TouchableOpacity style={styles.container} onPress={()=>{navigation.navigate("Profile", {idUser: props.id})}}>
        <View style={styles.userField}>
            <View>
                <Image style={styles.userPhoto} source={photos}/>
            </View>
            <View>
                <Text style={styles.userName}>{props.username}</Text>
            </View>
        </View>
        <Text style={styles.location}>{props.location}</Text>
    </TouchableOpacity>
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
        shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity:  0.16,
        shadowRadius: 1.81,
        elevation: 6
    },
    userField: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    userPhoto: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 8
    },
    userName: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    location: {
        fontSize: 14,
        color: '#FFC15E',
        fontWeight: 'bold'
    },
});