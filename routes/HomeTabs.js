import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';

import Home from '../src/pages/Home'
import MapFair from '../src/pages/Map'
import Search from '../src/pages/Search';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator initialRouteName={'Home'}
    screenOptions={() => ({
      tabBarActiveTintColor: '#FCE45D',
      tabBarInactiveTintColor: '#FFC15E',
      tabBarStyle: {
        paddingTop: 10,
        height: 65,
        backgroundColor: '#CE6A85'
      }
    })}>
      <Tab.Screen 
      name="Map" 
      component={MapFair} 
      options={{title:'', headerShown: false, tabBarIcon: ({color}) => (
        <Entypo name='location-pin' color={color} size={36}/>
      )}}/>
      <Tab.Screen 
      name="Home" 
      component={Home} 
      options={{title:'', headerShown: false, tabBarIcon: ({color}) => (
        <Entypo name='home' color={color} size={36}/>
      )}}/>
      <Tab.Screen 
      name="Search" 
      component={Search} 
      options={{title:'', headerShown: false, tabBarIcon: ({color}) => (
        <Entypo name='magnifying-glass' color={color} size={36}/>
      )}}/>
    </Tab.Navigator>
  );
}