import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, SafeAreaView, TouchableOpacity, Text, FlatList, ActivityIndicator } from 'react-native';
// import * as FileSystem from 'expo-file-system';

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

    const photo = require.context('../../../assets/user_img', true);
    const userImage = photo(`./${user.photo[0]}`);
    
    // const getImage = async () => {
    //     response = await api.get(`/picture/646c116ff016c0e98f83733e`);
    //     let image = `data:image/png;${response.data.data}`;
    //     console.log(response.data);
    // }

    useEffect(() => {
        setIsSeller(user.isSeller);
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
        if(isSeller || user.debugMode) {
            return(
                <PublishContainer/>
            );
        }
    };

    renderItem = ({item}) => (
        <Publish
        id={item.owner._id}
        photo={item.owner.photo[0]} 
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
                    <Image style={styles.userPhoto} source={userImage}/>
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