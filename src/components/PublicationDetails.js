import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import { Entypo } from '@expo/vector-icons';

const PublicationDetails = ({ navigation, route }) => {
  const { publication } = route.params;
  const contentPhotoUrl = `https://drive.google.com/uc?export=view&id=${publication.owner.photoUrl}`;
  const contentImageUrl = `https://drive.google.com/uc?export=view&id=${publication.imageUrl}`;
  const formattedDate = moment(publication.createdAt).format('DD [de] MMM [às] HH:mm');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Entypo name="arrow-bold-left" color="#5C374C" size={46} />
      </TouchableOpacity>
      <View style={styles.main}> 
        <View style={styles.userField}>
          <Image style={styles.userPhoto} source={{ uri: contentPhotoUrl }} />
          <Text style={styles.userName}>{publication.owner.nickname}</Text>
        </View> 
        <Image style={styles.image} source={{ uri: contentImageUrl }} />
        <View style={styles.info}>
          <Text>{publication.description}</Text>
          <Text>{formattedDate}</Text>
          {/*<Text>{publication.createdAt}</Text>*/}
          <Text style={styles.location}>{publication.location}</Text>
          <Text style={styles.stockStatus}>{publication.inStock ? 'Disponível' : 'Indisponível'}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CE6A85',
    padding: 20,
  },
  main:{
    flex: 1,
    justifyContent: 'center'
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
    fontWeight: "700",
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 5,
    //marginBottom: 10,
  },
  info: {
    backgroundColor: '#FAA275',
    padding: 10,
    //marginTop: 10,
  },
  location: {
    fontSize: 15,
    color: '#FFC15E',
    fontWeight: "700"
  },
  stockStatus: {
    fontSize: 15,
    color: 'white',
    fontWeight: "700",
    marginTop: 5,
  },
});

export default PublicationDetails;
