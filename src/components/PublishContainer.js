import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Entypo } from '@expo/vector-icons';
import axios from "axios";

import { useAuth } from '../context/auth';
import PickImage from './PickImage';

export default function PublishContainer() {
    const { user } = useAuth();
    const [imageData, setImageData] = useState(null);
    const [description, setDescription] = useState('');

    function handleGetImage(image) {
        setImageData(image);
    }

    async function handlePublication() {
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
            const response = await axios.post('https://pointfair.onrender.com/picture/upload/', formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
            })

            const data = {
                description: description,
                imageUrl: response.data.imageUrl,
                inStock: true,
                owner: user._id,
            };
            const publication = await axios.post('https://pointfair.onrender.com/publication', data);
            console.log(publication.data);
            
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
                onChangeText={(value)=>setDescription(value)}
            />
            <View style={styles.publishButtons}>
                {imageData && <View style={styles.preview}>
                    <Text style={{color: '#ccc', fontSize: 13, marginRight: 10}}>{imageData[0].uri.substring(imageData[0].uri.lastIndexOf('/') + 1, imageData[0].uri.length)}</Text>
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
