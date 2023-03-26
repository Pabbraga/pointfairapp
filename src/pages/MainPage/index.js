import React from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 

import Tabs from '../../../routes/Tabs'

export default function MainPage() {
    return(
        <NavigationContainer>
            <Tabs />
        </NavigationContainer>
    );
}