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
import ValidationPublicationComponent from "../components/Publication/ValidationPublicationComponent";

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

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.listePublications}>
          {listePublicationsRecherche.map((publication: PublicationEntity) => {
            return (
              <ValidationPublicationComponent
                key={publication.id}
                publication={publication}
                navigation={props.navigation}
              ></ValidationPublicationComponent>
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

  listePublications: {
    padding: 10,
    width: "100%",
  },
});
