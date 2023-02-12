import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from "react-native";
import { Image } from "native-base";
import React from "react";
import { useAuth } from "../../services/AuthentificationService";
import images from "../../ressources/ListeImagesLocales";
import { FooterAuthentification } from "./FooterAuthentification";
import { color } from "native-base/lib/typescript/theme/styled-system";

export default function Connexion({ navigation }: any) {
  const auth = useAuth();
  const onConnexion = () => {
    auth.register();
  };
  return (
    <View style={styles.view}>
      <Image source={images.logo2} alt="logo_slogan" style={styles.image} />

      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Mot de passe" />

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
}

const styles = StyleSheet.create({
  view: {
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
