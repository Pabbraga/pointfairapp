import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Entypo } from '@expo/vector-icons';

import api from '../services/api';
import { useAuth } from '../context/auth';
import PickImage from './PickImage';

export default function PublishCreate() {
    const { user } = useAuth();
    const [imageData, setImageData] = useState(null);
    const [description, setDescription] = useState('');

    function handleGetImage(image) {
        setImageData(image);
    }

    async function handlePublication() {
        if(!imageData && !description) {
            Alert.alert("Erro", "Não é possível criar uma publicação em branco.");
            return;
        }
        if(!imageData) {
            Alert.alert("Selecione uma imagem!");
            return;
        } 
        if(!description) {
            Alert.alert("Defina uma descrição para a publicação");
            return;
        }
        const filename = imageData[0].uri.substring(imageData[0].uri.lastIndexOf('/') + 1, imageData[0].uri.length);
        const formData = new FormData();
        const extend = filename.split('.')[1];
        formData.append('file', JSON.parse(JSON.stringify({
            name: filename,
            uri: imageData[0].uri,
            type: 'image/' + extend,
            base64: imageData[0].base64,
        })))

        try {
            const response = await api.post('/picture/upload/', formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
            });

            const data = {
                description: description,
                imageUrl: response.data.imageUrl,
                inStock: true,
                owner: user._id,
            };
            try {
                const publication = await api.post('/publication', data).catch((err)=>{
                    Alert.alert("Ocorreu um erro", "Tente denovo mais tarde, contate os administradores.");
                    return;
                });
                console.log(publication?.data);
            
                Alert.alert("Publicado.");
            } catch (err) {
            }
            
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
                onChangeText={(value)=>setDescription(value)}/>
            <View style={styles.publishButtons}>
                {imageData && <View style={styles.preview}>
                    <Text style={styles.previewText}>{imageData[0].uri.substring(imageData[0].uri.lastIndexOf('/') + 1, imageData[0].uri.length)}</Text>
                    <TouchableOpacity style={styles.cancelButton} onPress={()=>setImageData(null)}>
                        <Entypo name='cross' color={'#ccc'} size={15}/>
                    </TouchableOpacity>
                </View>}
                <PickImage handleGetImage={handleGetImage}/>
                <TouchableOpacity onPress={handlePublication}><Entypo name='paper-plane' color={'black'} size={28}/></TouchableOpacity>
            </View>
            
        </View>        
    )
}

const styles = StyleSheet.create({
    publishSection: {
        marginTop: 15,
        marginBottom: 10
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
    },
    publishButtons: {
        flexDirection: 'row',
        marginTop: 10,
        alignSelf: 'flex-end',
        columnGap: 5,
    },
    preview: {
        width: 200,
        height: 30,
        marginRight: 55,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 25,
        backgroundColor: '#985277',
        flexWrap: 'nowrap'
    },
    previewText: {
        color: '#ccc', 
        fontSize: 13, 
        marginRight: 5,
    },
    cancelButton: {
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#ccc'
    }
})
