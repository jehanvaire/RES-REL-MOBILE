import { Box, Center, Spacer, Avatar, Stack, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { View } from "native-base";
import { AuthentificationEnum } from "../ressources/enums/AuthentificationEnum";
import { storage } from "../services/AuthentificationService";
import PublicationService from "../services/PublicationService";
import { UtilisateurEntity } from "../ressources/types/UtilisateurEntity";
import Description from "../components/Description";
import MenuHamburgerProfil from "../components/MenuHamburgerProfil";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Publication from "../components/Publication/Publication";
import DetailsPublication from "../components/Publication/DetailsPublication";
import ParametresScreen from "./MenuProfilUtilisateur/ParametresScreen";
import GestionComptesAdministrateursScreen from "./MenuProfilUtilisateur/GestionComptesAdministrateursScreen";
import GestionCategoriesScreen from "./MenuProfilUtilisateur/GestionCategoriesScreen";
import GestionComptesUtilisateursScreen from "./MenuProfilUtilisateur/GestionComptesUtilisateursScreen";
import StatistiquesScreen from "./MenuProfilUtilisateur/StatistiquesScreen";
import FavorisScreen from "./MenuProfilUtilisateur/FavorisScreen";
import PublicationsEnregistreesScreen from "./MenuProfilUtilisateur/PublicationsEnregistrees";
import { PublicationEntity } from "../ressources/types/PublicationEntity";

export const StackNav = createStackNavigator();

// const scrollY = new Animated.Value(0);

// const headerHeight = scrollY.interpolate({
//   inputRange: [0, 100],
//   outputRange: [200, 100],
//   extrapolate: "clamp",
// });

// const headerStyle = {
//   height: headerHeight,
// };

function ProfilScreen({ navigation }: any) {
  const [listePublications, setListePublications] = useState<
    PublicationEntity[]
  >([]);
  const [utilisateur, setUtilisateur] = useState<UtilisateurEntity>(
    {} as UtilisateurEntity
  );

  const fetchListePublicationsUtilisateur = async () => {
    // Get the list of publications
    const listePublications =
      await PublicationService.GetListePublicationsUtilisateur(1);
    setListePublications(listePublications);
  };

  useEffect(() => {
    var user_json = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";
    fetchListePublicationsUtilisateur();

    var user = JSON.parse(user_json) as UtilisateurEntity;
    setUtilisateur(user);
  }, []);

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <Stack direction="row" style={styles.header}>
          <Avatar
            size={100}
            source={{
              uri: utilisateur.lienPhoto,
            }}
          ></Avatar>

          <Center marginLeft={2}>
            <Text style={styles.title}>
              {utilisateur.nom} {utilisateur.prenom}
            </Text>
          </Center>

          <Spacer />

          <Center>
            <MenuHamburgerProfil navigation={navigation}></MenuHamburgerProfil>
          </Center>
        </Stack>

        <ScrollView>
          <Description contenu={utilisateur.contenu ?? ""}></Description>

          <Text style={styles.title}>Publications</Text>
          <Box
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "black",
              marginTop: 10,
              marginBottom: 10,
            }}
          ></Box>
          {listePublications.map((publication) => (
            <View key={publication.id}>
              <Publication
                auteur={publication.auteur}
                titre={publication.titre}
                contenu={publication.contenu}
                status={publication.status}
                raisonRefus={publication.raisonRefus}
                dateCreation={publication.dateCreation}
                lienImage={publication.lienImage}
                navigation={navigation}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
}

const ProfilStack = () => {
  return (
    <StackNav.Navigator initialRouteName="ProfilScreen">
      <StackNav.Screen
        name="ProfilScreen"
        component={ProfilScreen}
        options={{ headerShown: false }}
      />
      <StackNav.Screen
        name="Publication"
        component={Publication}
        options={{ headerShown: false }}
      />
      <StackNav.Screen
        name="DetailsPublication"
        component={DetailsPublication}
        options={{ headerShown: true, title: "" }}
      />
      <StackNav.Screen
        name="GestionComptesAdministrateursScreen"
        component={GestionComptesAdministrateursScreen}
      />
      <StackNav.Screen
        name="GestionCategoriesScreen"
        component={GestionCategoriesScreen}
      />
      <StackNav.Screen
        name="GestionComptesUtilisateursScreen"
        component={GestionComptesUtilisateursScreen}
      />
      <StackNav.Screen
        name="StatistiquesScreen"
        component={StatistiquesScreen}
      />
      <StackNav.Screen name="ParametresScreen" component={ParametresScreen} />
      <StackNav.Screen name="FavorisScreen" component={FavorisScreen} />
      <StackNav.Screen
        name="PublicationsEnregistrees"
        component={PublicationsEnregistreesScreen}
      />
    </StackNav.Navigator>
  );
};

export default ProfilStack;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    margin: 10,
    marginTop: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  contenu: {
    margin: 10,
    marginTop: 5,
    fontSize: 15,
  },
});
