import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

function Calendar({ navigation }) {
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

export default Calendar;
