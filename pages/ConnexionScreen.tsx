import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Box, Input, View } from "native-base";
import axios from "axios";
import { MMKV } from "react-native-mmkv";

export default function ConnexionScreen({ navigation }: any) {
  const storage = new MMKV();
  const [nom, setNom] = React.useState("");

  const [motDePasse, setMotDePasse] = React.useState("");

  const handleConnexion = () => {
    // TODO: Appeler le service de connexion try catch
    // TODO: Vérifier mot de passe
    // TODO:  try catch

    // const response = await axios.post(
    //   "http://localhost:3000/api/utilisateurs/connexion",
    //   {
    //     nom: nom,
    //     motDePasse: motDePasse,
    //   }
    // );

    const response = {
      data: {
        token: "123456789",
      },
    };

    storage.set("user_token", response.data.token);
    navigation.navigate("Menu");
  };

  return (
    <Box style={styles.container}>
      <Input placeholder="Nom" value={nom} onChangeText={setNom} />

      <Input
        placeholder="Mot de passe"
        value={motDePasse}
        onChangeText={setMotDePasse}
      />

      <TouchableOpacity onPress={handleConnexion}>
        <Text>Connexion</Text>
      </TouchableOpacity>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
