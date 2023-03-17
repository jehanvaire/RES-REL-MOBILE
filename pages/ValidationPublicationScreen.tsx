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
  const [listePublicationsEnAttente, setListePublicationsEnAttente] = useState<
    PublicationEntity[]
  >([]);

  useEffect(() => {
    var user_json = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";

    var user = JSON.parse(user_json) as UtilisateurEntity;
    setUtilisateur(user);
  }, []);

  const fetchPublicationsEnAttente = () => {
    PublicationService.GetAllPublications().then((listePublications) => {
      // TODO : afficher les 10 dernières publications
      setListePublicationsEnAttente(listePublications);
    });
  };

  useEffect(() => {
    fetchPublicationsEnAttente();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.listePublications}>
          {listePublicationsEnAttente.map((publication: PublicationEntity) => {
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
