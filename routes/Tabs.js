import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';

import Home from '../src/pages/Home'
import Map from '../src/pages/Map'
import Search from '../src/pages/Search';

const Tab = createBottomTabNavigator();

const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case 'Home':
      iconName = 'home';
      break;
    case 'Map':
      iconName = 'location-pin';
      break;
    case 'Search':
      iconName = 'magnifying-glass';
      break;
    default:
      break;
  }

  return <Entypo name={iconName} color={'#FF8C61'} size={36} />;
};

export default function Tabs() {
  return (
    <Tab.Navigator initialRouteName={'Home'} screenOptions={({route}) => ({
      tabBarIcon: ({color}) => screenOptions(route, color),
      tabBarStyle: {
        paddingTop: 10,
        height: 65,
        backgroundColor: '#CE6A85'
      }
    })}>
      <Tab.Screen name="Map" component={Map} options={{title:'', headerShown: false}}/>
      <Tab.Screen name="Home" component={Home} options={{title:'', headerShown: false}}/>
      <Tab.Screen name="Search" component={Search} options={{title:'', headerShown: false}}/>
    </Tab.Navigator>
  );
}