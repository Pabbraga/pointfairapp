import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons'; 
import styles from './style';
import { useAuth } from '../../context/auth';

export default function Profile({navigation}) {
    const { user, signOut, signed } = useAuth();
    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{position: 'absolute', top: 25, left: 20}}>
                <Entypo name='arrow-bold-left' color={'black'} size={46}/>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    signOut();
                    navigation.navigate("Login");
                    console.log(signed);
                }}
                style={{position: 'absolute', top: 25, right: 20}}>
                <Entypo name='log-out' color={'black'} size={40}/>
            </TouchableOpacity>
            <View style={styles.perfil}>
                <Image style={styles.userPhoto} source={require('../../../assets/user_img/picture.jpg')}/>
                <Text style={styles.h1}>{user?.nmUser}</Text>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProfileChange')}>
                    <Text style={styles.buttonText}>Editar perfil</Text>
                </TouchableOpacity>

                <View style={styles.icons}>
                    <Entypo name="box" size={32} color="black" style={{ marginRight: 70 }}/>
                    <Entypo name="shop" size={32} color="black" style={{ marginRight: 70 }}/>
                    <Entypo name="calendar" size={32} color="black" />
                </View>
            </View>
        
            <View style={styles.product}>
                <View>
                    <Image style={styles.productphoto} source={require('../../../assets/img/rosaAmarela.jpg')}/>
                    <Image style={styles.productphoto} source={require('../../../assets/img/rosaVermelha.jpg')}/>
                </View>

                <View>
                    <Image style={styles.productphoto} source={require('../../../assets/img/girassol.jpg')}/>
                    <Image style={styles.productphoto} source={require('../../../assets/img/gerberaPink.jpg')}/>
                </View>
            </View>
        </SafeAreaView>
    );
}