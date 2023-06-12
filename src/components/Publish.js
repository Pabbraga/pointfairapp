import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/auth';
import api from '../services/api';

export default function Publish({ item }) {
  const navigation = useNavigation();
  const [isFollowing, setIsFollowing] = React.useState(false);
  const { user } = useAuth();

  React.useEffect(() => {
    for (let i = 0; i < user?.following.length; i++) {
      if (user?.following[i] == authorId) {
        setIsFollowing(true);
      }
    }
  }, []);

  const showPublicationDetails = () => {
    navigation.navigate('PublicationDetails', { publication: item });
  };

  const publication = item;
  const authorId = publication.owner._id;
  const contentPhotoUrl = `https://drive.google.com/uc?export=view&id=${publication.owner.photoUrl}`;
  const contentImageUrl = `https://drive.google.com/uc?export=view&id=${publication.imageUrl}`;

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    if (!isFollowing) {
      api.put(`/following/follow/${user._id}/${authorId}`);
    }
    if (isFollowing) {
      api.put(`/following/unfollow/${user._id}/${authorId}`);
    }
  };

  const handleReport = () => {
    Alert.alert(
      'Denunciar Publicação',
      'Você deseja denunciar esta publicação?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Denunciar', onPress: sendReport, style: 'destructive' },
      ],
      { cancelable: true }
    );
  };

  const sendReport = async () => {
    try {
      await api.post(`/reports`, { publicationId: publication._id });
      Alert.alert('Denúncia enviada', 'Obrigado por relatar essa publicação.');
    } catch (error) {
      Alert.alert(
        'Erro ao enviar denúncia',
        'Ocorreu um erro ao enviar sua denúncia. Por favor, tente novamente mais tarde.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userField}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { idUser: authorId })}>
          <Image style={styles.userPhoto} source={{ uri: contentPhotoUrl }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { idUser: authorId })}>
          <Text style={styles.userName}>{publication.owner.nickname}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.followButton} onPress={handleFollow}>
          <Text style={styles.text}>{isFollowing ? 'Deixar de seguir' : 'Seguir'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reportButton} onPress={handleReport}>
          <Text style={styles.reportButtonText}>Denunciar</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={showPublicationDetails}>
        <Image style={styles.image} source={{ uri: contentImageUrl }} />
      </TouchableOpacity>
      <View style={styles.info}>
        <Text>{publication.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  userField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userPhoto: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#5C374C',
  },
  userName: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: 320,
    height: 180,
    borderRadius: 5,
  },
  followButton: {
    marginLeft: 20,
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#5C374C',
  },
  text: {
    fontWeight: 'bold',
    color: '#fff',
  },
  reportButton: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#FF0000',
  },
  reportButtonText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  info: {
    backgroundColor: '#FAA275',
    width: 320,
    height: 60,
    padding: 10,
  },
  location: {
    fontSize: 15,
    color: '#FFC15E',
    fontWeight: 'bold',
  },
});
