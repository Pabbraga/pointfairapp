import {useEffect, useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import api from '../services/api';
import { useNavigation } from '@react-navigation/native'; 

export default function SectionSeller(props) {
    const [activeIcon, setActiveIcon] = useState('box');
    const [publications, setPublications] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const userData = props.userData;
    const navigation = useNavigation();

    useEffect(() => {
        loadPublications();
    }, [])

    function BoxView(props) {
        const image = `https://drive.google.com/uc?export=view&id=${props.item.imageUrl}`;
        return(
            <TouchableOpacity style={styles.box} onPress={() => navigateToPublicationDetails(props.item)}>
                <Image style={styles.image} source={{uri:image}}/>
            </TouchableOpacity>
        )
    }

    async function loadPublications() {
        try {
            const res = await api.get('/publication');
            const userPublications = res.data.filter(publication => (publication.owner.email == userData.email));
            setPublications(userPublications);
            setRefreshing(false);
        } catch (err) {
            Alert.alert(err.response.data);
        }
    }

    handleRefresh = () => {
        setRefreshing(true);
        loadPublications();
    }

    const renderItem = ({item}) => {
        return (
            <BoxView item={item}/>
        );
    }

    const renderSection = () => {
        if (activeIcon == 'box') {
            return (
                <View style={styles.section}>
                    <Text style={styles.articleH1}>Publicações</Text>
                    <FlatList
                        keyExtractor={(item) => item._id}
                        renderItem={renderItem}
                        data={publications}
                        style={styles.contentImages}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                </View>
            );
        } else if (activeIcon == 'shop') {
            return (
                <View style={styles.section}>
                    <Text style={styles.articleH1}>Feira</Text>
                    <View style={styles.content}>
                        <Text style={styles.articleP}>Feira: {userData.fair.description}</Text>
                        <Text style={styles.articleP}>Cidade: {userData.fair.city}</Text>
                        <Text style={styles.articleP}>Bairro: {userData.fair.district}</Text>
                    </View>
                </View>
            );
        } else if (activeIcon == 'calendar') {
            return (
                <View style={styles.section}>
                    <Text style={styles.articleH1}>Horários</Text>
                    <View style={styles.content}>
                        <Text style={styles.articleP}>Domingo:</Text>
                        <Text style={styles.articleP}>Segunda:</Text>
                        <Text style={styles.articleP}>Terça:</Text>
                        <Text style={styles.articleP}>Quarta:</Text>
                        <Text style={styles.articleP}>Quinta:</Text>
                        <Text style={styles.articleP}>Sexta:</Text>
                        <Text style={styles.articleP}>Sábado:</Text>
                    </View>
                </View>
            );
        }
    };

    const navigateToPublicationDetails = (publication) => {
        navigation.navigate('PublicationDetails', { publication });
    };

    return(
        <View style={styles.container}>
            <View style={styles.sectionSelector}>
                <TouchableOpacity  
                    style={[styles.sectionButton, activeIcon == 'box' ? customStyles.activeSection : null]} 
                    onPress={()=>{setActiveIcon('box')}}>
                    <Entypo name="box" size={32} color={activeIcon == 'box' ? '#985277' : '#5C374C'}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.sectionButton, activeIcon == 'shop' ? customStyles.activeSection : {}]} 
                    onPress={()=>{setActiveIcon('shop')}}>
                    <Entypo name="shop" size={32} color={activeIcon == 'shop' ? '#985277' : '#5C374C'}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.sectionButton, activeIcon == 'calendar' ? customStyles.activeSection : {}]} 
                    onPress={()=>{setActiveIcon('calendar')}}>
                    <Entypo name="calendar" size={32} color={activeIcon == 'calendar' ? '#985277' : '#5C374C'}/>
                </TouchableOpacity>
            </View>
            {renderSection()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '80%',
        alignItems: 'center',
    },
    sectionSelector: {
        backgroundColor: '#FFC15E',
        flexDirection: 'row',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    sectionButton: {
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    section: {
        width: '100%',
        height: '80%',
        backgroundColor: '#FAA275',
        padding: 22,
        borderRadius: 5,
    },
    articleH1: {
        padding: 10,
        fontSize: 26,
        fontWeight: 600,
        textAlign: 'center',
        backgroundColor: '#985277',
        color: '#fff'
    },
    content: {
        flex: 1,
        padding: 10,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    articleP: {
        fontSize: 20,
        fontWeight: 500,
        paddingBottom: 10,
        color: '#5C374C',
    },
    contentImages: {
        paddingTop: 2,
        backgroundColor: '#fff',
    },
    image: {
        width: 125,
        height: 100,
        margin: 2,
        borderWidth: 2,
        borderColor: '#5C374C',
        borderRadius: 3,
        resizeMode: 'cover',
        alignSelf: 'center'
    }
});

const customStyles = StyleSheet.create({
    activeSection: {
        backgroundColor: '#FAA275',
        borderTopStartRadius: 5,
        borderTopEndRadius: 5
    },
});