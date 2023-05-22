import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Entypo } from '@expo/vector-icons';

import api from '../services/api';
import UploadImage from './UploadImage';

export default function PublishContainer() {
    const [image, setImage] = useState(null);
    const [imageData, setImageData] = useState(null);

    function handleGetImage(image) {
        setImageData(image);
        setImageBlob(image);
    }

    async function setImageBlob(imageData) {
        const uri = imageData.uri;
        const response = await fetch(uri);
        const blob = await response.blob();
        if(imageData.fileName) blob._data.name = imageData.fileName
        blob._data.type = imageData.type;
        setImage(blob);
    };

    function publish() {
        if(!image) {
            Alert.alert("Imagem não encontrada", "Nenhuma imagem selecionada e/ou encontrada.");
            return;
        }
        const data = {
            name: image._data.name,
            file: image,
            src: imageData.uri
        }
        try {
            api.post('/picture', data);
            Alert.alert("Publicado.");
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <View style={styles.publishSection}>
            <TextInput
                style={styles.publishForm}
                multiline
                numberOfLines={3}
                maxLength={50}
            />
            <View style={styles.publishButtons}>
                {image && <View style={styles.preview}>
                    <Text style={{color: '#ccc', fontSize: 13, marginRight: 10}}>{image._data.name}</Text>
                    <TouchableOpacity style={styles.cancelButton} onPress={()=>setImage(null)}>
                        <Entypo name='cross' color={'#ccc'} size={15}/>
                    </TouchableOpacity>
                </View>}
                <UploadImage handleGetImage={handleGetImage}/>
                {/* <TouchableOpacity><Entypo name='location-pin' color={'black'} size={28}/></TouchableOpacity> */}
                <TouchableOpacity onPress={publish}><Entypo name='paper-plane' color={'black'} size={28}/></TouchableOpacity>
            </View>
            
        </View>        
    )
}

const styles = StyleSheet.create({
    publishSection: {
        marginTop: 15,
    },
    publishForm: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        textAlign: "left",
        textAlignVertical: "top",
        fontSize: 20,
        height: 80,
        justifyContent:"center"
    },
    publishButtons: {
        flexDirection: 'row',
        marginTop: 10,
        alignSelf: 'flex-end',
        columnGap: 5,
        flexWrap: 'wrap',
    },
    preview: {
        height: 30,
        borderRadius: 10,
        marginRight: 100,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 15,
        paddingLeft: 10,
        backgroundColor: '#985277',
    },
    cancelButton: {
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#ccc'
    }
})
