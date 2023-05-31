import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, SafeAreaView, TouchableOpacity, Text, FlatList } from 'react-native';

import { useAuth } from '../../context/auth';
import api from '../../services/api';

import styles from './style';
import Publish from '../../components/Publish';
import PublishCreate from '../../components/PublishCreate';
import LoadingScreen from '../../components/LoadingScreen';

export default function Home({navigation}) {
    const { user } = useAuth();
    const [isSeller, setIsSeller] = useState(true);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [userPhoto, setUserPhoto] = useState(null);

    useEffect(() => {
        setLoading(true);
        setIsSeller(user.isSeller);
        setUserPhoto(`https://drive.google.com/uc?export=view&id=${user.photoUrl}`)
        loadPublications();
        setLoading(false);
    }, []);

    if(loading) {
        return(
            <LoadingScreen />
        )
    }

    async function loadPublications() {
        const res = await api.get('/publication');
        setData([...res.data]);
        setRefreshing(false);
    }

    renderHeader = () => {
        if(!isSeller && !user.debugMode) return;
        if(isSeller || user.debugMode) {
            return(
                <PublishCreate/>
            );
        }
    };

    renderItem = ({item}) => (
        <Publish
        id={item.owner._id}
        photo={item.owner?.photoUrl} 
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
                    <Image style={styles.userPhoto} source={{uri:userPhoto}}/>
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
                maxToRenderPerBatch={10}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}