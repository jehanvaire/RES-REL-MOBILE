import { createStackNavigator } from "@react-navigation/stack";
import FavorisScreen from "../../pages/MenuProfilUtilisateur/FavorisScreen";
import GestionCategoriesScreen from "../../pages/MenuProfilUtilisateur/GestionCategoriesScreen";
import GestionComptesAdministrateursScreen from "../../pages/MenuProfilUtilisateur/GestionComptesAdministrateursScreen";
import GestionComptesUtilisateursScreen from "../../pages/MenuProfilUtilisateur/GestionComptesUtilisateursScreen";
import ParametresScreen from "../../pages/MenuProfilUtilisateur/ParametresScreen";
import PublicationsEnregistreesScreen from "../../pages/MenuProfilUtilisateur/PublicationsEnregistrees";
import StatistiquesScreen from "../../pages/MenuProfilUtilisateur/StatistiquesScreen";
import ProfilScreen from "../../pages/ProfilScreen";
import DetailsPublication from "../Ressource/DetailsPublication";
import Publication from "../Ressource/Publication";
import React from "react";
import PdfView from "../../pages/PdfView";
import EspaceCommentaireScreen from "../../pages/Publication/EspaceCommentaireScreen";

export const StackNav = createStackNavigator();

const ProfilStackNavigator = (props: any) => {
  const { utilisateur } = props.route.params;

  return (
    <StackNav.Navigator initialRouteName="ProfilScreen">
      <StackNav.Screen
        name="ProfilScreen"
        component={ProfilScreen}
        options={{ headerShown: false }}
        initialParams={{ utilisateur: utilisateur }}
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
        options={
          { headerShown: true, title: "Statistiques"}
        }
      />
      <StackNav.Screen name="ParametresScreen" component={ParametresScreen} />
      <StackNav.Screen name="FavorisScreen" component={FavorisScreen} />
      <StackNav.Screen
        name="PublicationsEnregistrees"
        component={PublicationsEnregistreesScreen}
      />
      <StackNav.Screen
        name="EspaceCommentaireScreen"
        component={EspaceCommentaireScreen}
      />
      <StackNav.Screen name="PdfView" component={PdfView} />
    </StackNav.Navigator>
  );
};

export default ProfilStackNavigator;
