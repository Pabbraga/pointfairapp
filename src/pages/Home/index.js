import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, SafeAreaView, TouchableOpacity, Text, FlatList, ActivityIndicator } from 'react-native';

import { useAuth } from '../../context/auth';
import api from '../../services/api';

import styles from './style';
import Publish from '../../components/Publish';
import PublishContainer from '../../components/PublishContainer';

export default function Home({navigation}) {
    const { user } = useAuth();
    const [isSeller, setIsSeller] = useState(true);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const userPhotoUrl = `https://drive.google.com/uc?export=view&id=${user?.photo}`;

    useEffect(() => {
        setIsSeller(user?.isSeller);
        loadPublications();
        setTimeout(()=> {
            setLoading(false);
        }, 2000)
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
        setRefreshing(false);
    }

    renderHeader = () => {
        if(isSeller === false) return;
        if(isSeller || user?.debugMode) {
            return(
                <PublishContainer/>
            );
        }
    };

    renderItem = ({item}) => (
        <Publish
        id={item.owner._id}
        photo={item.owner.photo} 
        username={item.owner.nickname} 
        content={item.imageUrl}
        // location={item.owner.location.city}
        />
    );

    handleRefresh = () => {
        setRefreshing(true);
        loadPublications();
    }

    return(
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='#CE6A85' translucent={false}/>
            <View style={styles.header}>
                <TouchableOpacity onPress={loadPublications}>
                    <Text style={styles.logoMark}>PointFair</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate('Profile', {idUser: null})}}>
                    <Image style={styles.userPhoto} source={{uri:userPhotoUrl}}/>
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
                refreshing={refreshing}
                onRefresh={handleRefresh}
            />
        </SafeAreaView>
    );
}