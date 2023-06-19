import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons'; 
import PickPhoto from '../../components/PickPhoto';
import styles from './style';
import { useAuth } from '../../context/auth';
import api from '../../services/api';

export default function ProfileChange({navigation}) {
    const { user, reloadUser, signed } = useAuth();
    const [imageData, setImageData] = useState(null);
    const [nickname, setNickname] = useState(user?.nickname);
    const [description, setDescription] = useState(user?.description);
    let responseImage = null;

    function handleGetImage(image) {
        setImageData(image);
    }

    const handleUpdate = async () => {
        if(imageData) {
            const filename = imageData[0].uri.substring(imageData[0].uri.lastIndexOf('/') + 1, imageData[0].uri.length);
            const formData = new FormData();
            const extend = filename.split('.')[1];
            formData.append('file', JSON.parse(JSON.stringify({
                name: filename,
                uri: imageData[0].uri,
                type: 'image/' + extend,
                base64: imageData[0].base64,
            })));
            const res = await api.post("/picture/upload", formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
            });
            responseImage = res.data.imageUrl;
        }
        const photoUrl = responseImage?responseImage:user.photoUrl;
        user.photoUrl = photoUrl;
        const data = {
            nickname: nickname,
            photoUrl: photoUrl,
            description: description
        }
        api.put(`/user/profile/${user._id}`, data)
            .then((res)=>{
                reloadUser(user.email, null, signed);
                Alert.alert(res.data.msg)
            })
            .catch((err)=>{
                console.log(err);
            });
    }

    return(
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='#CE6A85' translucent={false}/>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{position: 'absolute', top: 30, left: 20}}>
                <Entypo name='arrow-bold-left' color={'#5C374C'} size={46}/>
            </TouchableOpacity>
            <Text style={styles.title}>Editar perfil</Text>
            <View style={styles.form}>
                <PickPhoto handleGetImage={handleGetImage}/>
                <TextInput style={styles.textInput} value={nickname} onChangeText={(value)=> {setNickname(value)}}/>
                <TextInput 
                    style={styles.descriptionInput}
                    multiline
                    numberOfLines={3}
                    maxLength={45}
                    value={description} 
                    onChangeText={(value)=> {setDescription(value)}}/>
                <TouchableOpacity 
                style={styles.button} 
                onPress={handleUpdate}>
                    <Text style={styles.buttonText}>Concluído</Text>
                </TouchableOpacity>                
            </View>
        </SafeAreaView>
    );
}