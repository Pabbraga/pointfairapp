import React from 'react-native';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


import styles from './style';

export default function Register({navigation}) {
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
            <ScrollView>
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

                    <View style={styles.group}>
                        <Text  style={styles.p}>E-mail</Text>
                        <TextInput style={styles.input}/>
                    </View>

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

                    <TouchableOpacity style={styles.opacity}>
                        <Text style={styles.link}>Sou um vendedor</Text>
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