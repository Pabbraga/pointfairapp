import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import styles from './style';
import { useAuth } from '../../context/auth';
import Box from './box';
import Shop from './shop';
import Calendar from './calendar';

function BoxIcon({ active }) {
  return (
    <Entypo name="box" size={32} color="black"
      style={[active ? styles.activeSection : {}, { marginRight: 30 }]}
    />
  );
}

function ShopIcon({ active }) {
  return (
    <Entypo name="shop" size={32} color="black"
      style={[active ? styles.activeSection : {}, { marginRight: 30 }]}
    />
  );
}

function CalendarIcon({ active }) {
  return (
    <Entypo name="calendar" size={32} color="black"
      style={active ? styles.activeSection : {}}
    />
  );
}

function Profile({ navigation }) {
  const { user, signOut, signed } = useAuth();
  const [activeSection, setActiveSection] = React.useState('box');
  const [activeIcon, setActiveIcon] = React.useState('box');
  const [isMenuOpen, setMenuOpen] = React.useState(false);

  const handleSignOut = () => {
    signOut();
    navigation.navigate('Login');
  };
  
  const handleIconPress = (icon) => {
    setActiveSection(icon);
    setActiveIcon(icon);
  };

  const openAppWebsite = () => {
    Linking.openURL('https://www.example.com');
  };

  const renderSection = () => {
    if (activeSection === 'box') {
      return <Box navigation={navigation} />;
    } else if (activeSection === 'shop') {
      return <Shop navigation={navigation} />;
    } else if (activeSection === 'calendar') {
      return <Calendar navigation={navigation} />;
    }
};

const toggleMenu = () => {
  setMenuOpen(!isMenuOpen);
};

return (
<SafeAreaView style={styles.container}>
  <StatusBar backgroundColor="#CE6A85" translucent={false} />
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 25, left: 20 }}>
      <Entypo name="arrow-bold-left" color="black" size={46} />
    </TouchableOpacity>
    <TouchableOpacity onPress={toggleMenu} style={{ position: 'absolute', top: 25, right: 20 }}>
      <Entypo name="menu" color="black" size={40} />
    </TouchableOpacity>
    
    {isMenuOpen && (
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={openAppWebsite}>
          <Text style={styles.menuItemText}>Site do App</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
          <Text style={styles.menuItemText}>Sair</Text>
        </TouchableOpacity>
      </View>
    )}
    
    <View style={styles.perfil}>
      <Image style={styles.userPhoto} source={require('../../../assets/user_img/picture.jpg')} />
      <Text style={styles.h1}>{user?.nmUser}</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProfileChange')}>
        <Text style={styles.buttonText}>Editar perfil</Text>
      </TouchableOpacity>
      
      <View style={styles.icons}>
        <TouchableOpacity onPress={() => handleIconPress('box')}>
          <BoxIcon active={activeIcon === 'box'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress('shop')}>
          <ShopIcon active={activeIcon === 'shop'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress('calendar')}>
          <CalendarIcon active={activeIcon === 'calendar'} />
        </TouchableOpacity>
      </View>
      </View>
      
      <View style={styles.section}>
        {renderSection()}
      </View>
  </SafeAreaView>
  );
}

export default Profile;