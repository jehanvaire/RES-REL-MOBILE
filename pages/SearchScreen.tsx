import { Center, Spacer, Stack, Image } from "native-base";
import React, { useEffect, useState } from "react";

import { StyleSheet, TouchableOpacity, Text, TextInput } from "react-native";
import { View } from "native-base";
import { UtilisateurEntity } from "../ressources/types/UtilisateurEntity";
import { AuthentificationEnum } from "../ressources/enums/AuthentificationEnum";
import { storage } from "../services/AuthentificationService";
import Ionicons from "react-native-vector-icons/Ionicons";
import PublicationService from "../services/PublicationService";
import { PublicationEntity } from "../ressources/types/PublicationEntity";
import { createStackNavigator } from "@react-navigation/stack";
import DetailsPublication from "../components/Publication/DetailsPublication";

const StackNav = createStackNavigator();

function ListePublicationsScreen(props: any) {
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

        setListePublicationsRecherche(liste);
      });
    } else {
      setListePublicationsRecherche([]);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startSearch();
    }, 250);

    return () => clearTimeout(timer);
  }, [searchValue]);

  function AfficherPublication(publication: PublicationEntity) {
    props.navigation.navigate("DetailsPublication", {
      auteur: publication.auteur,
      titre: publication.titre,
      description: publication.description,
      status: publication.status,
      raisonRefus: publication.raisonRefus,
      dateCreation: JSON.stringify(publication.dateCreation),
      lienImage: publication.lienImage,
    });
  }

  return (
    <View style={styles.container}>
      <Center style={styles.searchStack}>
        <Stack direction="row">
          <TextInput
            style={styles.textInput}
            onChangeText={setSeachValue}
            value={searchValue}
            placeholder="Rechercher une ressource"
            returnKeyType="search"
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

      <View style={styles.listePublications}>
        {listePublicationsRecherche.map((publication: PublicationEntity) => {
          return (
            <TouchableOpacity
              style={{}}
              key={publication.id}
              onPress={() => {
                AfficherPublication(publication);
              }}
            >
              <Stack style={styles.publicationPreview} direction="row">
                <Text style={styles.titrePreview}>{publication.titre}</Text>
                <Spacer />
                <Image
                  style={styles.imagePrewiew}
                  source={{
                    uri: publication.lienImage,
                  }}
                  alt={publication.titre + " image"}
                  size="xl"
                />
              </Stack>
            </TouchableOpacity>
          );
        })}
      </View>

      <Spacer />
    </View>
  );
}

const RechercheStack = () => {
  return (
    <StackNav.Navigator initialRouteName="RechercheScreen">
      <StackNav.Screen
        name="RechercheScreen"
        component={ListePublicationsScreen}
        options={{ headerShown: false }}
      />
      <StackNav.Screen
        name="DetailsPublication"
        component={DetailsPublication}
        options={{ headerShown: true, title: "" }}
      />
    </StackNav.Navigator>
  );
};

export default RechercheStack;

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
  listePublications: {
    padding: 10,
    width: "100%",
  },
  publicationPreview: {
    backgroundColor: "white",
    height: 50,
    width: "100%",
    marginBottom: 10,
    borderRadius: 10,
  },
  titrePreview: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  imagePrewiew: {
    height: 42,
    width: 42,
    borderRadius: 10,
    marginTop: 4,
    marginBottom: 4,
    marginRight: 4,
  },
});
