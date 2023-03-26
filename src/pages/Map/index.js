import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

import styles from './style';

export default function App() {

  const [origin, setOrigin] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(()=>{
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão de acesso a localização negada.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0100,
        longitudeDelta: 0.0100
      })
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        initialRegion={origin}
        showsUserLocation={true}
        zoomEnabled={false}
        loadingEnabled={true}
      >
        
      </MapView>
      <View style={styles.search}>
        
      </View>
    </View>
  );
}