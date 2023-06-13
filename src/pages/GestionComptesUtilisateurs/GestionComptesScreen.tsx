import { Center, Stack } from "native-base";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import { View } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { UtilisateurEntity } from "../../ressources/models/UtilisateurEntity";
import { storage } from "../../services/AuthentificationService";
import { AuthentificationEnum } from "../../ressources/enums/AuthentificationEnum";
import GestionUtilisateursTopNavigator from "../../components/Navigators/GestionUtilisateurs/GestionUtilisateursTopNavigator";
import UtilisateurService from "../../services/UtilisateurService";

const GestionComptesScreen = () => {
  const [utilisateur, setUtilisateur] = useState<UtilisateurEntity>(
    {} as UtilisateurEntity
  );

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    var user_json = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";
    if (user_json !== "") {
      var user = JSON.parse(user_json) as UtilisateurEntity;
      setUtilisateur(user);
    } else {
      setUtilisateur({} as UtilisateurEntity);
    }
  }, []);

  const startSearch = () => {
    if (searchValue !== "") {
      const params = {
        query: {
          utilisateur: {
            q: searchValue,
          },
        },
      };
      UtilisateurService.ChercherUtilisateurs(params).then((listeResultats) => {
        const comptesActifs = listeResultats.data.filter(
          (utilisateur: UtilisateurEntity) => {
            return utilisateur.raisonBan === null;
          }
        );
        const comptesBannis = listeResultats.data.filter(
          (utilisateur: UtilisateurEntity) => {
            return utilisateur.raisonBan !== null;
          }
        );
        UtilisateurService.SetComptesActifs(comptesActifs);
        UtilisateurService.SetComptesBannis(comptesBannis);
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startSearch();
    }, 250);
    return () => clearTimeout(timer);
  }, [searchValue]);

  return (
    <>
      <StatusBar translucent backgroundColor="#BBB" />
      <View style={{ width: "100%" }}>
        <Center
          // style={styles.searchStack}
          style={styles.searchStack}
        >
          <Stack direction="row" backgroundColor="red">
            <TextInput
              style={styles.textInput}
              onChangeText={setSearchValue}
              value={searchValue}
              placeholder="Ressource, utilisateur, catégorie..."
              returnKeyType="search"
            />
            <TouchableOpacity>
              <Ionicons
                name="search-outline"
                size={25}
                style={[styles.searchIcon]}
              />
            </TouchableOpacity>
          </Stack>
        </Center>
      </View>
      <GestionUtilisateursTopNavigator></GestionUtilisateursTopNavigator>
    </>
  );
};

export default GestionComptesScreen;

const styles = StyleSheet.create({
  searchStack: {
    backgroundColor: "white",
    height: 50,
    width: "100%",
  },
  textInput: {
    height: 40,
    fontSize: 15,
    paddingLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    width: "75%",
    borderColor: "gray",
    borderWidth: 1,
  },
  searchIcon: {
    color: "black",
    marginTop: 5,
    marginRight: 10,
  },
  cache: {
    display: "none",
  },
});
