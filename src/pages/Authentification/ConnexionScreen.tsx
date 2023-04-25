import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from "react-native";
import { Image } from "native-base";
import React, { useState } from "react";
import { useAuth } from "../../services/AuthentificationService";
import images from "../../ressources/ListeImagesLocales";
import FooterAuthentification from "./FooterAuthentification";

const ConnexionSreen = () => {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onConnexion = async () => {
    try {
      await auth.login(email, password);
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
    }
  };
  return (
    <View style={styles.container}>
      <Image source={images.logo2} alt="logo_slogan" style={styles.image} />

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />

      <TouchableOpacity
        onPress={() => onConnexion()}
        style={[styles.button, styles.shadow]}
      >
        <Text style={styles.textButton}>Connexion</Text>
      </TouchableOpacity>
      <Text style={styles.textAide}>Mot de passe oublié ? - Centre d'aide</Text>
      <FooterAuthentification />
    </View>
  );
};

export default ConnexionSreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  input: {
    height: 50,
    width: "70%",
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: "rgb(227, 227, 227)",
    borderColor: "rgb(143, 143, 143)",
    borderWidth: 1,
    paddingLeft: 10,
  },
  button: {
    borderRadius: 10,
    height: 50,
    width: "70%",
    backgroundColor: "rgb(45, 186, 131)",
    marginTop: 10,
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
  textAide: {
    fontSize: 12,
    color: "rgb(143, 143, 143)",
    marginTop: 10,
  },
});
