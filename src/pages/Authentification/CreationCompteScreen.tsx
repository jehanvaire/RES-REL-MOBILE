import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Platform,
} from "react-native";
import { Image, ScrollView } from "native-base";
import React, { useState } from "react";
import images from "../../ressources/ListeImagesLocales";
import FooterAuthentification from "./FooterAuthentification";
import { UtilisateurEntity } from "../../ressources/models/UtilisateurEntity";
import DateTimePicker, {
  Event as DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

const CreationCompteScreen = (props: any) => {
  const [utilisateur, setUtilisateur] = useState({} as UtilisateurEntity);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [erreurLongueurMDP, seterreurLongueurMDP] = useState(false);
  const [mailError, setMailError] = useState(false);
  const [champsManquants, setChampsManquants] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const isMailValid = () => {
    return (
      utilisateur.mail &&
      utilisateur.mail.includes("@") &&
      utilisateur.mail.includes(".")
    );
  };

  const isPasswordValid = () => {
    return utilisateur.motDePasse && utilisateur.motDePasse === confirmPassword;
  };
  const checkPasswordLength = () => {
    return utilisateur.motDePasse && utilisateur.motDePasse.length >= 8;
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "set") {
      const currentDate = selectedDate || utilisateur.dateNaissance;
      setShowDatePicker(Platform.OS === "ios");
      setUtilisateur({ ...utilisateur, dateNaissance: currentDate });
    } else {
      setShowDatePicker(false);
    }
  };
  const onInscription = async () => {
    if (
      isPasswordValid() &&
      checkPasswordLength() &&
      isMailValid() &&
      utilisateur.dateNaissance &&
      utilisateur.nom &&
      utilisateur.prenom &&
      utilisateur.codePostal
    ) {
      setPasswordError(false);
      setMailError(false);
      props.navigation.navigate("ValidationMail", {
        utilisateur: utilisateur,
      });

      //redirect to ValidationMailScreen
    } else {
      isMailValid() ? setMailError(false) : setMailError(true);
      isPasswordValid() ? setPasswordError(false) : setPasswordError(true);
      checkPasswordLength()
        ? seterreurLongueurMDP(false)
        : seterreurLongueurMDP(true);
      setChampsManquants(true);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={images.logo2} alt="logo_slogan" style={styles.image} />
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
        style={styles.form}
      >
        <TextInput
          style={styles.input}
          placeholder="Nom*"
          onChangeText={(text) => setUtilisateur({ ...utilisateur, nom: text })}
          value={utilisateur.nom}
        />
        <TextInput
          style={styles.input}
          placeholder="Prénom*"
          onChangeText={(text) =>
            setUtilisateur({ ...utilisateur, prenom: text })
          }
          value={utilisateur.prenom}
        />
        {showDatePicker && (
          <DateTimePicker
            value={utilisateur.dateNaissance || new Date()}
            mode="date"
            display="default"
            onChange={onDateChange as any}
          />
        )}
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.input}
        >
          <Text
            style={[
              styles.dateNaissanceText,
              { color: utilisateur.dateNaissance ? "black" : "#8d8d8d" },
            ]}
          >
            {utilisateur.dateNaissance
              ? utilisateur.dateNaissance.toLocaleDateString()
              : "Date de Naissance*"}
          </Text>
        </TouchableOpacity>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          placeholder="Code Postal*"
          onChangeText={(text) =>
            setUtilisateur({ ...utilisateur, codePostal: text })
          }
          value={utilisateur.codePostal}
        />
        <TextInput
          style={styles.input}
          placeholder="Email*"
          onChangeText={(text) => {
            setUtilisateur({ ...utilisateur, mail: text });
          }}
          value={utilisateur.mail}
        />
        <TextInput
          style={styles.input}
          placeholder="Bio*"
          onChangeText={(text) => setUtilisateur({ ...utilisateur, bio: text })}
          value={utilisateur.bio}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe*"
          onChangeText={(text) =>
            setUtilisateur({ ...utilisateur, motDePasse: text })
          }
          value={utilisateur.motDePasse}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Répéter le mot de passe*"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          secureTextEntry
        />
        {mailError && (
          <Text style={styles.errorMessage}>
            L'adresse mail n'est pas valide.
          </Text>
        )}
        {passwordError && (
          <Text style={styles.errorMessage}>
            Les mots de passe ne correspondent pas.
          </Text>
        )}
        {erreurLongueurMDP && (
          <Text style={styles.errorMessage}>
            Le mot de passe doit contenir au moins 8 caractères.
          </Text>
        )}
        {champsManquants && (
          <Text style={styles.errorMessage}>
            Veuillez remplir tous les champs obligatoires.
          </Text>
        )}
        <Text>* Champs obligatoires</Text>
        <TouchableOpacity
          onPress={() => onInscription()}
          style={[styles.button, styles.shadow]}
        >
          <Text style={styles.textButton}>Créer mon compte</Text>
        </TouchableOpacity>
      </ScrollView>
      <FooterAuthentification />
    </View>
  );
};

export default CreationCompteScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  form: {
    marginTop: -20,
    width: "100%",
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
  errorMessage: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
  },
  dateNaissanceText: {
    fontSize: 15,
    textAlign: "left",
    height: 50,
    textAlignVertical: "center",
  },
});
