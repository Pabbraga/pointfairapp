import React from 'react';
import { View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  Linking 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/auth';
import api from '../services/api';

export default function Publish({ item }) {
  const navigation = useNavigation();
  const [isFollowing, setIsFollowing] = React.useState(false);
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);
  const { user } = useAuth();
  const isOwner = user?._id == item.owner._id

  const showPublicationDetails = () => {
    navigation.navigate('PublicationDetails', { publication: item });
  };

  const publication = item;
  const authorId = publication.owner._id;
  const contentPhotoUrl = `https://drive.google.com/uc?export=view&id=${publication.owner.photoUrl}`;
  const contentImageUrl = `https://drive.google.com/uc?export=view&id=${publication.imageUrl}`;

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    if(!isFollowing) {
      if(user.following.includes(authorId)) {
        return;
      }
      
      api.put(`/following/follow/${user._id}/${authorId}`);
      user.following.push(authorId);
    }
    if(isFollowing) {
      if(!user.following.includes(authorId)) {
        return;
      }
      
      api.put(`/following/unfollow/${user._id}/${authorId}`);
      for (let i = 0; i < user.following.length; i++) {
        if (user.following[i] == authorId) {
            user.following.splice(i, 1);
            i--;
        }
      }
    }
  }

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

  const sendReport = () => {
    const emailSubject = 'Denúncia de Publicação';
    const emailBody = `Usuário: ${publication.owner.nickname}\nPublicação: ${publication.description}`;

    // Substitua o endereço de e-mail abaixo pelo seu endereço de e-mail de destino
    const toEmail = 'pointfair.enterprise@gmail.com';

    Linking.openURL(`mailto:${toEmail}?subject=${emailSubject}&body=${emailBody}`)
      .then(() => {
        Alert.alert('Denúncia enviada', 'Obrigado por relatar essa publicação.');
      })
      .catch((error) => {
        Alert.alert(
          'Erro ao enviar denúncia',
          'Ocorreu um erro ao enviar sua denúncia. Por favor, tente novamente mais tarde.'
        );
      });
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleDelete = () => {
    Alert.alert('Apagar publicação', 'Você deseja apagar a sua publicação?', 
      [
        { text: 'Não', style: 'cancel'},
        { text: 'Sim', onPress: deletePublication, style: 'destructive'}
      ],
      { cancelable: true }
    )
  }

  const deletePublication = async () => {
    try {
      const res = await api.delete(`/publication/${publication._id}`);
      Alert.alert(res.data);
    } catch (err) {
      Alert.alert(err.response.data);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.userField}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { idUser: authorId })}>
          <Image style={styles.userPhoto} source={{ uri: contentPhotoUrl }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { idUser: authorId })}>
          <Text style={styles.userName}>{publication.owner.nickname}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
          <Text style={styles.menuButtonText}>▼</Text>
        </TouchableOpacity>
      </View>
      {isMenuVisible && !isOwner && (
        <View style={[styles.menuOptions, { position: 'absolute', top: 32, right: 0, zIndex: 1 }]}>
          <TouchableOpacity style={styles.menuOptions} onPress={handleFollow}>
            <Text style={styles.menuOptionText}>{isFollowing ? 'Deixar de seguir' : 'Seguir'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuOptions} onPress={handleReport}>
            <Text style={styles.menuOptionText}>Denunciar</Text>
          </TouchableOpacity>
        </View>
      )}
      {isMenuVisible && isOwner && (
        <View style={[styles.menuOptions, { position: 'absolute', top: 32, right: 0, zIndex: 1 }]}>
          <TouchableOpacity style={styles.menuOptions} onPress={handleDelete}>
            <Text style={styles.menuOptionText}>Apagar</Text>
          </TouchableOpacity>
        </View>
      )}
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
  menuButton: {
    marginLeft: 'auto',
    padding: 10,
  },
  menuButtonText: {
    fontSize: 24, // Altere o tamanho da seta aqui
    color: '#5C374C',
  },
  menuOptions: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    paddingVertical: 5,
  },
  menuOptionText: {
    fontSize: 16,
    color: '#5C374C',
  },
  info: {
    backgroundColor: '#FAA275',
    width: 320,
    height: 60,
    padding: 10,
  },
});