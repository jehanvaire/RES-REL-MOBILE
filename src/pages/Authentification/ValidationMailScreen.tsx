import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Image } from "native-base";
import images from "../../ressources/ListeImagesLocales";
import FooterAuthentification from "./FooterAuthentification";
import { openInbox } from "react-native-email-link";

const ValidationMail = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      {/* <Image
        source={images.resre_logo_slogan}
        alt="logo_slogan"
        style={styles.image}
      /> */}

      <View>
        <Text>Avant de continuer</Text>
        <Text>Un mail de confirmation vous a été envoyé</Text>

        <TouchableOpacity
          onPress={() => openInbox()}
          style={[styles.button, styles.shadow]}
        >
          <Text style={styles.textButton}>Valider mon compte</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
};

export default ValidationMail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: "auto",
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
