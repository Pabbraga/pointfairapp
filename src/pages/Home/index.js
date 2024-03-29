import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
    View, 
    Image, 
    SafeAreaView, 
    TouchableOpacity,
    Text, 
    FlatList, 
    ActivityIndicator, 
    Alert
} from 'react-native';
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

    function sortByFollowing (a, b) {
        let isFollowingA = user.following.includes(a.owner._id)
        let isFollowingB = user.following.includes(b.owner._id)
        
        if(isFollowingA && !isFollowingB) {
            return -1;
        } else if(!isFollowingA && isFollowingB) {
            return 1;
        } else {
            return 0;
        }
    }

    async function loadPublications() {
        try {
            const res = await api.get('/publication');
            const publications = res?.data.sort(sortByFollowing);
            setData(publications);
            setRefreshing(false);
        } catch (err) {
            Alert.alert(err.response.data);
        }
    }

    renderHeader = () => {
        if(!isSeller && !user?.debugMode) return;
        if(isSeller || user?.debugMode) {
            return(
                <PublishCreate/>
            );
        }
    };

    renderItem = ({item}) => (
        <Publish
        item={item}
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
                <TouchableOpacity onPress={()=>{navigation.navigate('Profile', {idUser: user?._id})}}>
                    <Image style={styles.userPhoto} source={{uri:userPhoto}}/>
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                style={styles.list}
                ListHeaderComponent={renderHeader}
                onEndReached={loadPublications}
                onEndReachedThreshold={0.1}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={ <FooterList load={loading}/> }
            />
            <View style={styles.bannerContainer}>
                <BannerAd
                    unitId={adUnitID}
                    size={BannerAdSize.FULL_BANNER}
                    requestOptions={{ requestNonPersonalizedAdsOnly: true }}
                />
            </View>
        </SafeAreaView>
    );
}

function FooterList({ load }) {
    if(!load) return;
    return(
        <View style={{padding: 10}}>
            <ActivityIndicator size={25} color={'#ccc'}/>
        </View>
    )
}