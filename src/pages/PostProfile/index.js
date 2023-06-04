import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import styles from './style';
import { useAuth } from '../../context/auth';
import api from '../../services/api';
import LoadingScreen from '../../components/LoadingScreen';
import SectionSeller from '../../components/SectionSeller';

function PostProfile({ navigation, route }) {
  const { idUser } = route.params;
  const [loading, setLoading] = useState(true);
  const { user, signOut } = useAuth();
  const [userData, setUserData] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [personalProfile, setPersonalProfile] = React.useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    if (idUser === user._id) {
      setPersonalProfile(true);
    }
    if (idUser === null) {
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

  if (loading) {
    return <LoadingScreen />;
  }

  const handleSignOut = () => {
    signOut();
    navigation.navigate('Login');
  };

  const openAppWebsite = () => {
    Linking.openURL('https://pointfair.netlify.app/');
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#CE6A85" translucent={false} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 20 }}>
          <Entypo name="arrow-bold-left" color="black" size={46} />
        </TouchableOpacity>
      </View>
      <View style={styles.userField}>
        <TouchableOpacity>
          <Image style={styles.userPhoto} source={{ uri: userPhoto }} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.userName}>{userData?.nickname}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default PostProfile;
