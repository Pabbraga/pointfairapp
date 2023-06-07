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
    const [responseImage, setResponseImage] = useState(null);
    const [nickname, setNickname] = useState(user?.nickname);

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
            setResponseImage(res);    
        }
        const data = {
            nickname: nickname,
            photoUrl: responseImage?responseImage.data.imageUrl:user?.photoUrl,
            description: ''
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
                <Entypo name='arrow-bold-left' color={'black'} size={46}/>
            </TouchableOpacity>
            <Text style={styles.title}>Editar perfil</Text>
            <View style={styles.form}>
                <PickPhoto handleGetImage={handleGetImage}/>
                <TextInput style={styles.textInput} value={nickname} onChangeText={(value)=> {setNickname(value)}}/>
                <TouchableOpacity 
                style={styles.button} 
                onPress={handleUpdate}>
                    <Text style={styles.buttonText}>Concluído</Text>
                </TouchableOpacity>                
            </View>
        </SafeAreaView>
    );
}