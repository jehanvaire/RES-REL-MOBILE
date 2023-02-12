import React from "react";
import { Button, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Box, Image, Spacer } from "native-base";
import { useAuth } from "../services/AuthentificationService";
import images from "../ressources/ListeImagesLocales";

// The registration view
const Connexion = () => {
  const auth = useAuth();
  const onConnexion = () => {
    auth.register();
  };

  return (
    <Box>
      <Box style={styles.view}>
        <Image
          source={images.resre_logo_slogan}
          alt="logo_slogan"
          style={styles.image}
        />
        <TouchableOpacity
          onPress={onConnexion}
          style={[styles.button, styles.shadow, {}]}
        >
          <Text style={styles.textButton}>Créer un compte</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onConnexion}
          style={[
            styles.button,
            styles.shadow,
            { backgroundColor: "rgb(63, 131, 238)" },
          ]}
        >
          <Text style={styles.textButton}>Se connecter</Text>
        </TouchableOpacity>
      </Box>
      <Box style={styles.footer}>
        <Text>(Re)ssources Relationnelles © 2022</Text>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
    height: 50,
    width: 250,
    backgroundColor: "rgb(45, 186, 131)",
    justifyContent: "center",
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 5,
  },
  textButton: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
});

export default Connexion;
