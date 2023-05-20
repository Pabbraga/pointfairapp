import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

function Shop({ navigation }) {
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

export default Shop;
