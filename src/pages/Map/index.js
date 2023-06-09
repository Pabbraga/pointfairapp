import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { Alert, TextInput, View } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import styles from './style';

export default function Map() {
  const [origin, setOrigin] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadLocation();
  }, []);

  async function loadLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setError('Permissão de acesso a localização negada.');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setOrigin({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0100,
      longitudeDelta: 0.0100
    })

    if(error) {
      Alert.alert(error);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#CE6A85' translucent={false}/>
      <MapView 
        style={styles.map}
        initialRegion={origin}
        showsUserLocation={true}
        zoomEnabled={true}
        loadingEnabled={true}
      >
        <Marker 
        coordinate={{ latitude: -23.605645, longitude: -46.761870 }} 
        pinColor={'red'} 
        title={'Feirinha Local'} 
        description={'Av. Armando de Andrade, 698-852 - Parque Santos Dumont'}
        />
      </MapView>
    </View>
  );
}