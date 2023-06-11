import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthentificationEnum } from "../../ressources/enums/AuthentificationEnum";
import { UtilisateurEntity } from "../../ressources/models/UtilisateurEntity";
import { storage } from "../../services/AuthentificationService";
import RestClient from "../../services/RestClient";
import { useAuth } from "../../services/AuthentificationService";

const ParametresScreen = (props: any) => {

  const navigation = useNavigation();
  const [utilisateur, setUtilisateur] = useState<UtilisateurEntity>({} as UtilisateurEntity);
  const deleteAPIUrl = "utilisateurs/";
  const [token, setToken] = useState<string>("");
  const restClient = new RestClient();
  const { logout } = useAuth();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Paramètres',
    });
  }, [navigation]);

  useEffect(() => {
    const utilisateurJson = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";
    const utilisateurObject = JSON.parse(utilisateurJson) as UtilisateurEntity;
    setUtilisateur(utilisateurObject);

    const token = storage.getString(AuthentificationEnum.ACCESS_TOKEN_KEY) ?? "";
    setToken(token);
  }, []
  );

  const handleDeleteAccount = () => {
    // Show a confirmation prompt before deleting the account
    Alert.alert(
      "Supprimer mon compte",
      "Êtes-vous sûr de vouloir supprimer votre compte? Cette action est irréversible.",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Supprimer", onPress: () => deleteAccount() },
      ],
      { cancelable: false }
    );
  };

  const deleteAccount = () => {
    const userID = utilisateur.id;
    restClient.delete(deleteAPIUrl + userID)
      .then((response) => {
        if (response.status === 200) {
          logout();
        }
      }
      )
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
        onPress={() => props.navigation.navigate('ThemeScreen')}
        style={styles.parameterItem}
      >
        <Ionicons name={"sunny-outline"} size={30} />
        <Text style={styles.parameterText}>Apparence</Text>
        <Ionicons name={"chevron-forward-outline"} size={30} />
      </TouchableOpacity>


      <TouchableOpacity
        onPress={() => props.navigation.navigate('AboutScreen')}
        style={styles.parameterItem}
      >
        <Ionicons name={"information-circle-outline"} size={30} />
        <Text style={styles.parameterText}>A propos</Text>
        <Ionicons name={"chevron-forward-outline"} size={30} />
      </TouchableOpacity>

      {/* Delete account */}
      <TouchableOpacity
        onPress={handleDeleteAccount}
        style={styles.parameterItem}
      >
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  parameterText: {
    position: 'absolute',
    left: 40,
    fontSize: 16,
  },
});