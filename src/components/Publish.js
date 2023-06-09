import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import PublicationDetails from './PublicationDetails';

export default function Publish({ item }) {
  const navigation = useNavigation();
  const [isInfoOpen, setIsInfoOpen] = useState(true);

  const toggleInfo = () => {
    setIsInfoOpen(!isInfoOpen);
  };

  const showPublicationDetails = () => {
    navigation.navigate('PublicationDetails', { publication: item });
  };

  const publication = item;
  const authorId = publication.owner._id;
  const contentPhotoUrl = `https://drive.google.com/uc?export=view&id=${publication.owner.photoUrl}`;
  const contentImageUrl = `https://drive.google.com/uc?export=view&id=${publication.imageUrl}`;

  return (
    <View style={styles.container}>
      <View style={styles.userField}>
        <TouchableOpacity onPress={() => { navigation.navigate('Profile', { idUser: authorId }) }}>
          <Image style={styles.userPhoto} source={{ uri: contentPhotoUrl }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('Profile', { idUser: authorId }) }}>
          <Text style={styles.userName}>{publication.owner.nickname}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={showPublicationDetails}>
        <Image style={styles.image} source={{ uri: contentImageUrl }} />
      </TouchableOpacity>
      {isInfoOpen &&
        <View style={styles.info}>
          <Text>{publication.description}</Text>
          <Text style={styles.location}>{publication.location}</Text>
        </View>}
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
    marginBottom: 10
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
    fontWeight: 'bold'
  },
  image: {
    width: 320,
    height: 180,
    borderRadius: 5,
  },
  info: {
    backgroundColor: '#FAA275',
    width: 320,
    height: 60,
    padding: 10
  },
  location: {
    fontSize: 15,
    color: '#FFC15E',
    fontWeight: 'bold'
  },
});