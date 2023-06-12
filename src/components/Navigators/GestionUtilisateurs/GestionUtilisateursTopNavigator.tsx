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
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Ionicons name="images" color={color} size={25} />
            ) : (
              <Ionicons name="images-outline" color={color} size={25} />
            ),
        }}
        component={GestionUtilisateursActifsNavigator}
      />
      <TopNav.Screen
        name="UtilisateursBannisScreen"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Ionicons name="person" color={color} size={25} />
            ) : (
              <Ionicons name="person-outline" color={color} size={25} />
            ),
        }}
        component={GestionUtilisateursBannisNavigator}
      />
    </TopNav.Navigator>
  );
}

export default GestionUtilisateursTopNavigator;
