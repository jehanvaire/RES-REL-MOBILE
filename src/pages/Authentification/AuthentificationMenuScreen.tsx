import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Image } from "native-base";
import images from "../../ressources/ListeImagesLocales";
import FooterAuthentification from "./FooterAuthentification";

const AuthentificationMenu = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Image
        source={images.resre_logo_slogan}
        alt="logo_slogan"
        style={styles.image}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Connexion")}
        style={[
          styles.button,
          styles.shadow,
          { backgroundColor: "rgb(63, 131, 238)" },
        ]}
      >
        <Text style={styles.textButton}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("CreationCompte")}
        style={[styles.button, styles.shadow]}
      >
        <Text style={styles.textButton}>Créer un compte</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("ModeInvite")}
        style={[
          styles.button,
          styles.shadow,
          { backgroundColor: "rgb(255,146,146)" },
        ]}
      >
        <Text style={styles.textButton}>Mode Invité</Text>
      </TouchableOpacity>


      <View style={styles.row}>
        <TouchableOpacity>
          {/* Only for debug */}
          <Text 
            onPress={() => navigation.navigate("ValidationMail")}
            style={styles.footertext}
          >Mot de passe oublié?</Text>
        </TouchableOpacity>
        <Text style={styles.footertext}> · </Text>
        <TouchableOpacity>
          <Text style={styles.footertext}>Nous contacter</Text>
        </TouchableOpacity>
      </View>

      <FooterAuthentification />

    </View >

  );
};

export default AuthentificationMenu;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 10,
    height: 50,
    width: "70%",
    marginVertical: 10,
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
    marginTop: 50,
    width: 200,
    height: 200,
  },
  footertext: {
    color: "#6a6a6a",
  },
  row: {
    flexDirection: 'row',
  },
  exitIcon: {
    color: "black",
    marginTop: 20,
    marginRight: -330,
  },
});
