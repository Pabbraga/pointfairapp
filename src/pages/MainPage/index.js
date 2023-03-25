import React from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 

if(Platform.OS){
    styles.fontWeight = 'normal'
}
import Tabs from '../../../routes/Tabs'

export default function MainPage() {
    return(
        <NavigationContainer>
            <Tabs />
        </NavigationContainer>
    );
}