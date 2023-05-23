import { useState, useEffect } from 'react';
import { Alert, TouchableOpacity } from 'react-native'; 
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons'; 


export default function PickImage({handleGetImage}) {
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

    const {assets, canceled} = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,3],
        quality: 0.8, 
    });

    if(!canceled) {
        handleGetImage(assets);
    } else {
        return;
    }
};

return (
    <TouchableOpacity onPress={()=> {pickImage()}}>
        <Entypo name='image' color={'black'} size={28}/>
    </TouchableOpacity>
);
}