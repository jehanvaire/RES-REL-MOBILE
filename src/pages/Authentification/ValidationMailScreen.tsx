import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Image } from "native-base";
import images from "../../ressources/ListeImagesLocales";
import FooterAuthentification from "./FooterAuthentification";
import { openInbox } from "react-native-email-link";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAuth } from "../../services/AuthentificationService";

const ValidationMail = ({ utilisateur }: any) => {
  const auth = useAuth();

  const checkValidationCompte = async () => {
    console.log("utilisateur", utilisateur);
    await auth.inscription(utilisateur);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Ionicons name="mail-unread-outline" size={75} color="#000000" />
      </View>
      <View style={styles.row}>
        <Text style={styles.headerText}>Merci pour votre inscription !</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.subText}>
          Un mail de confirmation vous a été envoyé. Pensez à vérifier vos
          spams.
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => openInbox()}
        style={[
          styles.button,
          styles.shadow,
          { backgroundColor: "rgb(45, 186, 131)" },
        ]}
      >
        <Text style={styles.textButton}>Ouvrir mes mails</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => checkValidationCompte()}
        style={[
          styles.button,
          styles.shadow,
          { backgroundColor: "rgb(65, 131, 244)" },
        ]}
      >
        <Text style={styles.textButton}>Accéder à l'application</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ValidationMail;

const styles = StyleSheet.create({
  subText: {
    fontSize: 16,
    marginBottom: 20,
    marginHorizontal: 40,
    textAlign: "center",
  },
  headerText: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
  },
  container: {
    marginTop: 200,
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
  },
  button: {
    borderRadius: 10,
    height: 50,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
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
    flexDirection: "row",
  },
  exitIcon: {
    color: "black",
    marginTop: 20,
    marginRight: -330,
  },
});
