import { useState, useEffect } from 'react';
import { Alert, TouchableOpacity } from 'react-native'; 
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons'; 


export default function UploadImage({handleGetImage}) {
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

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

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "Images",
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        });

        delete result.cancelled;

        result.assets[0].fileName = Math.floor(Date.now() * Math.random()).toString(36); 

        console.log(result);

        if(!result.canceled) {
            handleGetImage(result.assets[0]);
        }
    };
 
    return (
        <TouchableOpacity onPress={()=> {pickImage()}}>
            <Entypo name='image' color={'black'} size={28}/>
        </TouchableOpacity>
    );
}