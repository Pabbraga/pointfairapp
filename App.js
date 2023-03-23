import React,{useState} from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

<<<<<<< HEAD
import Login from './src/pages/Login'

export default function App() {
  return (
      <Login />
=======
import Welcome from './src/pages/Welcome';
import Login from './src/pages/Login';
import MainPage from './src/pages/MainPage';

export default function App() {
  return (
    <MainPage />
>>>>>>> 4efcd251c9da5e8aca6f47980a2a0e1c012dc79c
  );
}