import { Center } from "native-base";
import React from "react";

import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { View } from "native-base";
import { UserContext } from "../stores/UtilisateurStore";

export default function ListePublicationsScreen() {
  const utilisateur = React.useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text>
        {utilisateur.user.prenom} {utilisateur.user.nom}
      </Text>
      <Text>Profil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
});
