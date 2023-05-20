import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, SafeAreaView, TouchableOpacity, Text, FlatList, ActivityIndicator } from 'react-native';
// import * as FileSystem from 'expo-file-system';

import api from '../../services/api';

import styles from './style';
import Publish from '../../components/Publish';
import { useAuth } from '../../context/auth';
import PublishContainer from '../../components/PublishContainer';

export default function Home({navigation}) {
    const isSeller = true;
    const { user } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // const getData = async () => {
    //     FileSystem.downloadAsync(
    //         'http://techslides.com/demos/sample-videos/small.mp4',
    //         FileSystem.documentDirectory + 'small.mp4'
    //     )
    // }

    useEffect(() => {
        loadPublications();
        setTimeout(()=> {
            setLoading(false);
        }, 1500)
    }, []);

    if(loading) {
        return (
            <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
                <ActivityIndicator size='large' color='#999'/>
            </View>
        )
    }

    async function loadPublications() {
        const res = await api.get('/publication');
        setData([...res.data]);
    }

    renderHeader = () => {
        if(!isSeller) return null;

        return(
            <PublishContainer/>
        );
    };

    renderItem = ({item}) => (
        <Publish
        id={item.owner._id}
        photo={item.owner.photo[0]} 
        username={item.owner.nickname} 
        content={item.image}
        // location={item.owner.location.city}
        />
    );

    return(
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='#CE6A85' translucent={false}/>
            <View style={styles.header}>
                <TouchableOpacity onPress={loadPublications}>
                    <Text style={styles.logoMark}>PointFair</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate('Profile', {idUser: null})}}>
                    <Image style={styles.userPhoto} source={require('../../../assets/user_img/picture.jpg')}/>
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                style={styles.list}
                ListHeaderComponent={renderHeader}
                onEndReached={()=>loadPublications}
                onEndReachedThreshold={0.5}
            />
        </SafeAreaView>
    );
}