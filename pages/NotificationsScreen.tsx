import { Center } from "native-base";
import React, { useState } from "react";

import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { View } from "native-base";
import { Utilisateur } from "../ressources/types/Utilisateur";

export default function NotificationScreen(props: any) {
  return (
    <View style={styles.container}>
      <Text>
        {props.prenom} {props.nom}
      </Text>
      <Text>Nofitications</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
});
