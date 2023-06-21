import React, {useEffect, useState} from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  Linking, 
  Alert,
  FlatList 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import styles from './style';
import { useAuth } from '../../context/auth';
import api from '../../services/api';
import LoadingScreen from '../../components/LoadingScreen';
import SectionSeller from '../../components/SectionSeller';

function Profile({ navigation, route }) {
  const { idUser } = route.params;
  const [loading, setLoading] = useState(true);
  const { user, signOut } = useAuth();
  const [userData, setUserData] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [personalProfile, setPersonalProfile] = React.useState(false);
  const [isFollowing, setIsFollowing] = React.useState(false);

  useEffect(() => {
    loadUser();
  }, []);
  
  async function loadUser() {
    if(idUser == user._id) {
      setPersonalProfile(true);
    }
    try {
      const res = await api.get(`/user/${idUser}`);
      setUserData(res.data);
      setUserPhoto(`https://drive.google.com/uc?export=view&id=${res?.data.photoUrl}`);
      setLoading(false);
    } catch (err) {
      Alert.alert(err.response.data);
    } 
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
  
  const openAppWebsite = () => {
    Linking.openURL('https://pointfair.netlify.app/');
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    if(!isFollowing) {
        if(user.following.includes(userData._id)) {
          return;
        }
        api.put(`/following/follow/${user._id}/${userData._id}`);
    }
    if(isFollowing) {
      if(!user.following.includes(userData._id)) {
        return;
      }
      api.put(`/following/unfollow/${user._id}/${userData._id}`);
    }
  }

  const renderItem = ({item}) => {
    return (
        <View style={styles.followingItem}>
          <Text style={styles.followingText}>{item.nickname}</Text>
        </View>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#CE6A85" translucent={false} />
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 25, left: 20 }}>
        <Entypo name="arrow-bold-left" color="#5C374C" size={46} />
      </TouchableOpacity>
      {personalProfile && <TouchableOpacity onPress={toggleMenu} style={{ position: 'absolute', top: 25, right: 20 }}>
          <Entypo name="menu" color="#5C374C" size={40} />
      </TouchableOpacity>}
      {isMenuOpen &&
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={openAppWebsite}>
            <Text style={styles.menuItemText}>Mais informações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ProfileChange')}>
            <Text style={styles.menuItemText}>Editar perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ScheduleChange')}>
            <Text style={styles.menuItemText}>Editar horários</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
            <Text style={styles.menuItemText}>Sair</Text>
          </TouchableOpacity>
        </View>
      }
      <View style={styles.profile}>
        <Image style={styles.userPhoto} source={{uri:userPhoto}}/>
        <Text style={styles.nickname}>{userData.nickname}</Text>
        {!personalProfile && userData.isSeller && <TouchableOpacity style={styles.followButton} onPress={handleFollow}>
          <Text style={[styles.text, {fontSize: 14}]}>{isFollowing ? 'Deixar de seguir' : 'Seguir'}</Text>
        </TouchableOpacity>}
        {userData.description && 
        <View style={styles.description}>
          <Text style={styles.text}>{userData.description}</Text>
        </View>}
        {!userData.isSeller && userData.following && 
        <View style={styles.followingSection}>
          <Text style={styles.articleH1}>Seguindo</Text>
          <FlatList
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            data={userData.following}
            style={styles.followingList}
            showsVerticalScrollIndicator={false}
          />
        </View>}
      </View>        
      {userData.isSeller && <SectionSeller userData={userData}/> || userData.debugMode && <SectionSeller userData={userData}/>}
    </SafeAreaView>
  );  
}

export default Profile;