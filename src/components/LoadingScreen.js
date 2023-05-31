import React from 'react-native';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export default function LoadingScreen() {
    return(
        <View style={styles.container}>
            <ActivityIndicator size='large' color={'#ccc'}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        justifyContent:'center', 
        alignItems:'center' 
    }
})