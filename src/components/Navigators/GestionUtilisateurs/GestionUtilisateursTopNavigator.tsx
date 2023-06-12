import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import RechercheService from "../../../services/RechercheService";
import GestionUtilisateursActifsNavigator from "./GestionUtilisateursActifsNavigator";
import GestionUtilisateursBannisNavigator from "./GestionUtilisateursBannisNavigator";

const TopNav = createMaterialTopTabNavigator();

function GestionUtilisateursTopNavigator() {
  const [afficheHeader, setAfficheHeader] = useState(true);

  useEffect(() => {
    RechercheService.GetAfficheHeader().subscribe((affiche) => {
      setAfficheHeader(affiche);
    });
  }, []);

  return (
    <TopNav.Navigator
      initialRouteName="UtilisateursActifsScreen"
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: "blue", // changer la couleur de l'indicateur
        },
        // hide bar
        // tabBarStyle: { display: afficheHeader ? "flex" : "none" },
      }}
    >
      <TopNav.Screen
        name="UtilisateursActifsScreen"
        options={{
          tabBarShowLabel: true,
          tabBarLabel: "Comptes actifs",
        }}
        component={GestionUtilisateursActifsNavigator}
      />
      <TopNav.Screen
        name="UtilisateursBannisScreen"
        options={{
          tabBarShowLabel: true,
          tabBarLabel: "Comptes bannis",
        }}
        component={GestionUtilisateursBannisNavigator}
      />
    </TopNav.Navigator>
  );
}

export default GestionUtilisateursTopNavigator;
