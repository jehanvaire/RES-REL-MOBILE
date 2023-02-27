import { Center, Spacer, Stack, Image } from "native-base";
import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import { View } from "native-base";
import { UtilisateurEntity } from "../ressources/types/UtilisateurEntity";
import { AuthentificationEnum } from "../ressources/enums/AuthentificationEnum";
import { storage } from "../services/AuthentificationService";
import Ionicons from "react-native-vector-icons/Ionicons";
import PublicationService from "../services/PublicationService";
import { PublicationEntity } from "../ressources/types/PublicationEntity";
import { createStackNavigator } from "@react-navigation/stack";
import DetailsPublication from "../components/Publication/DetailsPublication";
import { color } from "native-base/lib/typescript/theme/styled-system";

const StackNav = createStackNavigator();

function ValidationRessourcesScreen(props: any) {
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
      PublicationService.GetAllPublications().then((listePublications) => {
        // TODO : afficher les 10 dernières publications
        setListePublicationsRecherche(listePublications);
      });
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
      contenu: publication.contenu,
      status: publication.status,
      raisonRefus: publication.raisonRefus,
      dateCreation: publication.dateCreation,
      lienImage: publication.lienImage,
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.listePublications}>
          {listePublicationsRecherche.map((publication: PublicationEntity) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  AfficherPublication(publication);
                }}
                key={publication.id}
                style={styles.publicationPreviewContainer}
              >
                <Stack style={styles.publicationPreview} direction="row">
                  <Text style={styles.titrePreview}>
                    {publication.titre.substring(0, 20)}
                    {publication.titre.length > 20 ? "..." : ""}
                  </Text>
                  <Spacer />
                  <Text style={styles.auteurPrewiew}>Adrien</Text>
                  <Image
                    style={styles.imagePrewiew}
                    source={{
                      uri: publication.lienImage,
                    }}
                    alt={publication.titre + " image"}
                    size="xl"
                  />
                </Stack>

                <Center>
                  <Stack direction="row">
                    <TouchableOpacity
                      style={[styles.bouton, { backgroundColor: "red" }]}
                    >
                      <Text>Refuser</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.bouton, { backgroundColor: "green" }]}
                    >
                      <Text>Accepter</Text>
                    </TouchableOpacity>
                  </Stack>
                </Center>
              </TouchableOpacity>
            );
          })}
        </View>

        <Spacer />
      </ScrollView>
    </View>
  );
}

const ValidationRessourcesStack = () => {
  return (
    <StackNav.Navigator initialRouteName="RechercheScreen">
      <StackNav.Screen
        name="RechercheScreen"
        component={ValidationRessourcesScreen}
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

export default ValidationRessourcesStack;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  publicationPreviewContainer: {
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 10,
  },
  bouton: {
    backgroundColor: "red",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  listePublications: {
    padding: 10,
    width: "100%",
  },
  publicationPreview: {
    height: 50,
    width: "100%",
    borderRadius: 10,
  },
  titrePreview: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  auteurPrewiew: {
    fontSize: 15,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 10,
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
