import React, { useEffect, useState } from "react";

import { StyleSheet, Text } from "react-native";
import { View } from "native-base";

import { AuthentificationEnum } from "../ressources/enums/AuthentificationEnum";
import { storage } from "../services/AuthentificationService";
const NotificationScreen = (props: any) => {
  const [user_storage, setUserStorage] = useState<any | null>(null);
  useEffect(() => {
    setUserStorage(storage.getString(AuthentificationEnum.CURRENT_USER));
  }, []);
  return (
    <View style={styles.container}>
      <Text>{user_storage}</Text>
      <Text>Nofitications</Text>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
});
