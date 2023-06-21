import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import api from "../../services/api";
import styles from "./style";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    if (email.trim() === "") {
      Alert.alert("Erro", "Por favor, digite seu e-mail");
      return;
    }

    try {
      const response = await api.post("/forgot-password", email);

      if (response.ok) {
        Alert.alert("Sucesso", "Código de senha gerado e enviado com sucesso");
        navigation.navigate("ResetPasswordConfirmation", { email });
      } else {
        Alert.alert("Erro", "Usuário não encontrado");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro ao gerar e enviar o código de senha");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFC15E" translucent={false} />
      <View style={styles.form}>
        <Text style={styles.h1}>Esqueci minha{"\n"}senha</Text>

        <Text style={styles.h2}>Digite seu E-mail</Text>
        <View style={styles.group}>
          <Text style={styles.p}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <Button
          title="Reset Password"
          onPress={handleResetPassword}
          style={styles.button}
        />
      </View>
    </View>
  );
}
