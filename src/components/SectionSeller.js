import {useEffect, useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function SectionSeller() {
    const [activeIcon, setActiveIcon] = useState('box');

    function BoxView(props) {
        const image = props.image;
        return(
            <TouchableOpacity style={styles.box}>
                <Image style={styles.image} source={image}/>
            </TouchableOpacity>
        )
    }

    const renderSection = () => {
        if (activeIcon == 'box') {
            return (
                <View style={styles.section}>
                    <Text style={styles.articleH1}>Publicações</Text>
                    <View style={styles.contentImages}>
                        <BoxView image={require('../../assets/img/rosaVermelha.jpg')}/>
                        <BoxView image={require('../../assets/img/rosaAmarela.jpg')}/>
                        <BoxView image={require('../../assets/img/floricultura.jpg')}/>
                    </View>
                </View>
            );
        } else if (activeIcon == 'shop') {
            return (
                <View style={styles.section}>
                    <Text style={styles.articleH1}>Feira</Text>
                    <View style={styles.content}>
                        <Text style={styles.articleP}>Feira:</Text>
                        <Text style={styles.articleP}>Estado:</Text>
                        <Text style={styles.articleP}>Cidade:</Text>
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
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 2,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    image: {
        width: 130,
        height: 100,
        margin: 2,
        marginStart: 3,
        borderWidth: 2,
        borderColor: '#5C374C',
        borderRadius: 5,
        resizeMode: 'cover',
    }
});

const customStyles = StyleSheet.create({
    activeSection: {
        backgroundColor: '#FAA275',
        borderTopStartRadius: 5,
        borderTopEndRadius: 5
    },
});