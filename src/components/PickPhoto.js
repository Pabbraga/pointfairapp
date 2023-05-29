import { useState, useEffect } from 'react';
import { View, Image, Alert, TouchableOpacity, StyleSheet } from 'react-native'; 
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons'; 

import { useAuth } from '../context/auth';

export default function PickPhoto({handleGetImage}) {
const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
const [changePhoto, setChangePhoto] = useState('');
const { user } = useAuth();

const photo = require.context('../../assets/user_img', true);

const uriImage = changePhoto?{uri:changePhoto}:photo(`./${user?.photoUrl}`)

useEffect(() => {
    (async () => {
        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
}, []);

const pickImage = async() => {
    if(hasGalleryPermission === false) {
        Alert.alert('Permissão negada', 'Sem acesso ao armazenamento interno.')
    }

    const {assets, canceled} = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,3],
        base64: true,
        quality: 0.3
    });

    if(!canceled) {
        setChangePhoto(assets[0].uri);
        handleGetImage(assets);
    } else {
        return;
    }
};

    return (
        <View>
            <Image style={styles.userPhoto} source={uriImage}/>
            {}
            <TouchableOpacity style={styles.photoFilter} onPress={()=> {pickImage()}}>
                <Entypo name='camera' color={'black'} size={30}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    photoFilter: {
        position: 'absolute',
        backgroundColor: 'rgba(211, 204, 208, 0.4)',
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    userPhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20
    },
});