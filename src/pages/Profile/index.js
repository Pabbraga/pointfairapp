import React, {useEffect, useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import styles from './style';
import { useAuth } from '../../context/auth';
import api from '../../services/api';
import LoadingScreen from '../../components/LoadingScreen';

const customStyles = StyleSheet.create({
  activeSection: {
    backgroundColor: '#FAA275',
    borderRadius: 100,
  },
});

function BoxIcon({ active, isSeller }) {
  return (
    <Entypo name="box" size={32} color={isSeller ? 'black' : 'gray'}
      style={[active ? customStyles.activeSection : {}, { marginRight: 30 }]}
    />
  );
}

function ShopIcon({ active, isSeller }) {
  return (
    <Entypo name="shop" size={32} color={isSeller ? 'black' : 'gray'}
      style={[active ? customStyles.activeSection : {}, { marginRight: 30 }]}
    />
  );
}

function CalendarIcon({ active, isSeller }) {
  return (
    <Entypo name="calendar" size={32} color={isSeller ? 'black' : 'gray'}
      style={active ? customStyles.activeSection : {}}
    />
  );
}

function Box() {
  return (
    <View>
      <Text>BOX</Text>
    </View>
  );
}

function Shop() {
  return (
    <View>
      <View style={styles.article}>
        <Text style={styles.articleH1}>Feira</Text>
        <Text style={styles.articleP}>Estado:</Text>
        <Text style={styles.articleP}>Cidade:</Text>
        <Text style={styles.articleP}>Feira:</Text>
      </View>
    </View>
  );
}

function Calendar() {
  return (
    <View>
      <View style={styles.article}>
        <Text style={{fontWeight: '600', fontSize: 20}}>Carga horaria da Semana</Text>
        <Text style={{fontWeight: '600', fontSize: 20}}>Horários:</Text>
        <Text style={styles.articleP}>Domingo:</Text>
        <Text style={styles.articleP}>Segunda:</Text>
        <Text style={styles.articleP}>Terça:</Text>
        <Text style={styles.articleP}>Quarta:</Text>
        <Text style={styles.articleP}>Quinta:</Text>
        <Text style={styles.articleP}>Sexta:</Text>
        <Text style={styles.articleP}>Sábado:</Text>
      </View>
    </View>
  );
}

function Profile({ navigation, route }) {
  const { idUser } = route.params;
  const [loading, setLoading] = useState(true);
  const { user, signOut } = useAuth();
  const [userData, setUserData] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const [activeSection, setActiveSection] = React.useState('box');
  const [activeIcon, setActiveIcon] = React.useState('box');
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [personalProfile, setPersonalProfile] = React.useState(false);

  useEffect(() => {
    loadUser();
  }, []);
  
  async function loadUser() {
    if(idUser == user._id) {
      setPersonalProfile(true);
    }
    if(idUser === null) {
      setUserData(user);
      setUserPhoto(`https://drive.google.com/uc?export=view&id=${user?.photoUrl}`);
      setPersonalProfile(true);
      setLoading(false);
      return;
    }

    const res = await api.get(`/user/${idUser}`);
    setUserData(res.data);
    setUserPhoto(`https://drive.google.com/uc?export=view&id=${res?.data.photoUrl}`);
    setLoading(false);
  }

    if(loading) {
      return (
        <LoadingScreen/>
      )
    }

  const handleSignOut = () => {
    signOut();
    navigation.navigate('Login');
  };

  const handleIconPress = (icon) => {
    setActiveSection(icon);
    setActiveIcon(icon);
  };
  
  const openAppWebsite = () => {
    Linking.openURL('https://pointfair.netlify.app/');
  };

  const renderSection = () => {
    if (activeSection === 'box' && activeIcon === 'box' && userData.isSeller) {
      return <Box navigation={navigation} />;
    } else if (activeSection === 'shop') {
      return <Shop navigation={navigation} />;
    } else if (activeSection === 'calendar') {
      return <Calendar navigation={navigation} />;
    } else {
      return null; // Retornar null quando nenhuma seção deve ser exibida
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
      {personalProfile && <TouchableOpacity onPress={toggleMenu} style={{ position: 'absolute', top: 25, right: 20 }}>
          <Entypo name="menu" color="black" size={40} />
      </TouchableOpacity>}
      {isMenuOpen && personalProfile &&
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={openAppWebsite}>
            <Text style={styles.menuItemText}>Site do App</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ProfileChange')}>
            <Text style={styles.menuItemText}>Editar perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
            <Text style={styles.menuItemText}>Sair</Text>
          </TouchableOpacity>
        </View>
      }
      <View style={styles.perfil}>
        <Image style={styles.userPhoto} source={{uri:userPhoto}}/>
        <Text style={styles.h1}>{userData?.nickname}</Text>
        
        <View style={styles.icons}>
        {userData.isSeller && (<TouchableOpacity onPress={() => handleIconPress('box')}>
          <BoxIcon active={activeIcon === 'box'} isSeller={userData.isSeller} />
        </TouchableOpacity>)}
          {userData.isSeller && (<TouchableOpacity onPress={() => handleIconPress('shop')}>
            <ShopIcon active={activeIcon === 'shop'} isSeller={userData.isSeller} />
          </TouchableOpacity>)}
          {userData.isSeller && (<TouchableOpacity onPress={() => handleIconPress('calendar')}>
            <CalendarIcon active={activeIcon === 'calendar'} isSeller={userData.isSeller} />
          </TouchableOpacity>)}
        </View>
      </View>
        
      <View style={styles.section}>
        {renderSection()}
      </View>
    </SafeAreaView>
  );  
}

export default Profile;