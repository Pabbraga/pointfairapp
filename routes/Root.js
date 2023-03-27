import React from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../src/pages/Welcome';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import Tabs from './Tabs';

const Stack = createNativeStackNavigator();

export default function Root(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                <Stack.Screen name="Tabs" component={Tabs} options={{headerShown: false}}/>
                <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}