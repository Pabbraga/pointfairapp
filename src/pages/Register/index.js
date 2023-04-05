//import React from 'react-native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


import styles from './style';

export default function Register({navigation}) {
    const [isSeller, setIsSeller] = useState(false);
    const [link, setLink] = React.useState('Sou um vendedor');

    const handleSellerClick = () => {
        if(link === 'Sou um vendedor') {
            setIsSeller(true);
            setLink('Sou um cliente');
        }
        else {
            scrollViewRef.current.scrollTo({ y: 0 });
            setIsSeller(false);
            setLink('Sou um vendedor');
        }
    };
    return(
        <View style={styles.container}>
            <View style={styles.top}>
                <LinearGradient style={[styles.circulo]}
                    start={{x:1,y:1}}
                    end={{x:0,y:0}} 
                    locations={[0.5,.9]}
                    colors={['#FFC15E', '#CE6A85']}>
                </LinearGradient>
                <LinearGradient style={styles.circulo}
                    start={{x:0,y:1}}
                    end={{x:1,y:0}} 
                    locations={[0.5,.9]}
                    colors={['#FFC15E', '#CE6A85']}>
                </LinearGradient>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.form}>
                    <Text style={styles.h1}>Cadastra-se</Text>
                    
                    <View style={styles.group}>
                        <Text style={styles.p}>Nome completo</Text>
                        <TextInput style={styles.input}/>
                    </View>

                    <View style={styles.group}>
                        <Text  style={styles.p}>Nome do usuário</Text>
                        <TextInput style={styles.input}/>
                    </View> 

                    {isSeller && (
                    <View style={styles.group}>
                        <Text  style={styles.p}>CNPJ</Text>
                        <TextInput style={styles.input}/>
                    </View>
                    )}

                    <View style={styles.group}>
                        <Text  style={styles.p}>E-mail</Text>
                        <TextInput style={styles.input}/>
                    </View>

                    {isSeller && (
                    <View style={styles.group}>
                        <Text  style={styles.p}>Nome fantasia</Text>
                        <TextInput style={styles.input}/>
                    </View>
                    )}

                    {isSeller && (
                    <View style={styles.group}>
                        <Text  style={styles.p}>Segmento</Text>
                        <TextInput style={styles.input}/>
                    </View>
                    )}

                    <View style={styles.group}>
                        <Text  style={styles.p}>Senha</Text>
                        <TextInput style={styles.input}/>
                    </View>

                    <View style={styles.group}>
                        <Text  style={styles.p}>confirmação de Senha</Text>
                        <TextInput style={styles.input}/>
                    </View>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.opacity} onPress={()=>{navigation.navigate('Login')}}>
                        <Text style={styles.link}>Já possuo uma conta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.opacity} onPress={handleSellerClick}>
                        <Text style={styles.link}>{link}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.top}>
                <LinearGradient style={styles.circulo}
                    start={{x:1,y:0}}
                    end={{x:0,y:1}} 
                    locations={[0.5,.9]}
                    colors={['#FFC15E', '#CE6A85']}>
                </LinearGradient>
                <LinearGradient style={styles.circulo}
                    start={{x:0,y:0}}
                    end={{x:1,y:1}} 
                    locations={[0.5,.9]}
                    colors={['#FFC15E', '#CE6A85']}>
                </LinearGradient>
            </View>
        </View>
    );
}