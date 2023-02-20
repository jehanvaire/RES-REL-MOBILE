import { Center, Spacer } from "native-base";
import React, { useEffect, useState } from "react";

import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { View } from "native-base";
import { Utilisateur } from "../ressources/types/Utilisateur";
import { MMKV } from "react-native-mmkv";
import { AuthentificationEnum } from "../ressources/enums/AuthentificationEnum";
import { storage } from "../services/AuthentificationService";

export default function ListePublicationsScreen(props: any) {
  const [user_storage, setUserStorage] = useState<any | null>(null);
  useEffect(() => {
    setUserStorage(storage.getString(AuthentificationEnum.CURRENT_USER));
  }, []);

  return (
    <View style={styles.container}>
      <Text>{user_storage}</Text>
      <Text>Profil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});
