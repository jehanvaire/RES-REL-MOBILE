import { Center, Spacer, Stack } from "native-base";
import React, { useEffect, useState } from "react";

import { StyleSheet, TouchableOpacity, Text, TextInput } from "react-native";
import { View } from "native-base";
import { UtilisateurEntity } from "../ressources/types/UtilisateurEntity";
import { AuthentificationEnum } from "../ressources/enums/AuthentificationEnum";
import { storage } from "../services/AuthentificationService";
import Ionicons from "react-native-vector-icons/Ionicons";
import PublicationService from "../services/PublicationService";
import { PublicationEntity } from "../ressources/types/PublicationEntity";

export default function ListePublicationsScreen(props: any) {
  const [utilisateur, setUtilisateur] = useState<UtilisateurEntity>(
    {} as UtilisateurEntity
  );
  const [searchValue, setSeachValue] = React.useState("");
  const [listePublicationsRecherche, setListePublicationsRecherche] = useState<
    PublicationEntity[]
  >([]);

  useEffect(() => {
    var user_json = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";

    var user = JSON.parse(user_json) as UtilisateurEntity;
    setUtilisateur(user);
  }, []);

  const startSearch = () => {
    console.log("search : " + searchValue);
    // TODO: call API

    // const query = searchValue;
    // const url = "https://api.github.com/search/repositories?q=" + query;
    // fetch(url)
    //   .then((response) => response.json())
    //   .then((json) => {
    //     console.log(json);
    //   });

    // TODO: supprimer quand l'API sera prête
    if (searchValue !== "") {
      PublicationService.GetAllPublications().then((listePublications) => {
        const liste = listePublications.filter((publication) => {
          return publication.titre
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        });

        console.log(liste);

        setListePublicationsRecherche(liste);
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
    <View style={styles.container}>
      <Center style={styles.searchStack}>
        <Stack direction="row">
          <TextInput
            style={styles.textInput}
            onChangeText={setSeachValue}
            value={searchValue}
            placeholder="Rechercher une ressource"
          />
          <TouchableOpacity>
            <Ionicons
              name="search-outline"
              size={25}
              style={[styles.searchIcon]}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="options-outline"
              size={25}
              style={[styles.searchIcon]}
            />
          </TouchableOpacity>
        </Stack>
      </Center>

      <Spacer />

      <Text>{searchValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  searchStack: {
    backgroundColor: "white",
    height: 50,
    width: "100%",
  },
  textInput: {
    height: 40,
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
});
