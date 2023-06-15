import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAuth } from "../../services/AuthentificationService";
import RestClient from "../../services/RestClient";
import { UtilisateurEntity } from "../../ressources/models/UtilisateurEntity";
import { storage } from "../../services/AuthentificationService";
import { AuthentificationEnum } from "../../ressources/enums/AuthentificationEnum";

const ParametresScreen = (props: any) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Paramètres",
    });
  }, [navigation]);

  const { logout } = useAuth();
  const restClient = new RestClient();
  const [utilisateur, setUtilisateur] = useState<UtilisateurEntity>({} as UtilisateurEntity);
  const userID = utilisateur.id;

  useEffect(() => {
    const utilisateurJson = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";
    const utilisateurObject = JSON.parse(utilisateurJson) as UtilisateurEntity;
    setUtilisateur(utilisateurObject);
  }, []);

  const supprimerCompte = () => {
    Alert.alert(
      "Supprimer le compte",
      "Êtes-vous sûr de vouloir supprimer votre compte ?",
      [
        {
          text: "Annuler",
          onPress: () => console.log("Annulation de la suppression du compte"),
          style: "cancel",
        },
        {
          text: "Supprimer",
          onPress: () => {
            restClient.delete("utilisateurs/" + userID)
            logout();
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.parameterItem}>
        <Ionicons name={"alert-circle-outline"} size={30} />
        <Text style={styles.parameterText}>Signaler un problème</Text>
        <Ionicons name={"chevron-forward-outline"} size={30} />
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.parameterItem}>
        <Ionicons name={"help-buoy-outline"} size={30} />
        <Text style={styles.parameterText}>Aide</Text>
        <Ionicons name={"chevron-forward-outline"} size={30} />
      </TouchableOpacity> */}

      <TouchableOpacity
        onPress={() => props.navigation.navigate("AboutScreen")}
        style={styles.parameterItem}
      >
        <Ionicons name={"information-circle-outline"} size={30} />
        <Text style={styles.parameterText}>A propos</Text>
        <Ionicons name={"chevron-forward-outline"} size={30} />
      </TouchableOpacity>

      {/* delete my account */}
      <TouchableOpacity onPress={supprimerCompte} style={styles.parameterItem}>
        <Ionicons name={"trash-outline"} size={30} />
        <Text style={styles.parameterText}>Supprimer mon compte</Text>
        <Ionicons name={"chevron-forward-outline"} size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default ParametresScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  parameterItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  parameterText: {
    position: "absolute",
    left: 40,
    fontSize: 16,
  },
});
