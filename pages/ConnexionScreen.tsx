import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { useAuth } from "../services/AuthentificationService";

// The registration view
const Connexion = () => {
  const auth = useAuth();
  const onConnexion = () => {
    console.log(`onConnexion`);
    auth.register();
  };

  return (
    <View style={styles.view}>
      <Button title={"Connexion"} onPress={onConnexion} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  button: {
    backgroundColor: "gray",
    height: 50,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    margin: 50,
  },
});

export default Connexion;
