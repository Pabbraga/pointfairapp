import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";

import styles from "./style";
import api from "../../services/api";

export default function ResetPassword({ route, navigation }) {
  const { email } = route.params;
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async () => {
    if (code.trim() === "" || newPassword.trim() === "") {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    try {
      const response = await api.post("/forgot-password", email);

      if (response.ok) {
        Alert.alert("Sucesso", "Senha redefinida com sucesso");
        navigation.navigate("Login");
      } else {
        Alert.alert("Erro", "Código de verificação inválido");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro ao redefinir a senha");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redefinir Senha</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Código</Text>
        <TextInput
          style={styles.input}
          value={code}
          onChangeText={setCode}
          placeholder="Insira o código recebido por e-mail"
        />

        <Text style={styles.label}>Nova Senha</Text>
        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          placeholder="Insira a nova senha"
        />

        <Button title="Redefinir Senha" onPress={handleResetPassword} />
      </View>
    </View>
  );
}
