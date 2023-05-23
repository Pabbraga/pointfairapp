import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Entypo } from '@expo/vector-icons';

import api from '../services/api';
import UploadImage from './UploadImage';

export default function PublishContainer() {
    const [imageData, setImageData] = useState(null);

    function handleGetImage(image) {
        let picture = []
        if(image.fileName) {
            picture.push(image);
            picture.name = image.fileName
            delete picture.fileName
            console.log(picture[0].base64);
            setImageData(picture);
            return;
        }
        picture.name = Math.floor(Math.random() * Date.now());
        setImageData(picture);
    }

    function publish() {
        if(!imageData) {
            Alert.alert("Imagem não encontrada", "Nenhuma imagem selecionada e/ou encontrada.");
            return;
        }
        const data = {
            name: imageData.name,
            file: imageData[0].base64
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
                {imageData && <View style={styles.preview}>
                    <Text style={{color: '#ccc', fontSize: 13, marginRight: 10}}>{imageData.name}</Text>
                    <TouchableOpacity style={styles.cancelButton} onPress={()=>setImageData()}>
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
