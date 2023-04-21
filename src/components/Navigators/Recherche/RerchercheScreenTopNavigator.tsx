import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import RessourceStackNavigator from "./RessourceStackNavigator";
import UtilisateurStackNavigator from "./UtilisateurStackNavigator";
import { useEffect, useState } from "react";
import RechercheService from "../../../services/RechercheService";

const TopNav = createMaterialTopTabNavigator();

function RechercheScreenTopNavigator() {
  const [afficheHeader, setAfficheHeader] = useState(true);

  useEffect(() => {
    RechercheService.GetAfficheHeader().subscribe((affiche) => {
      setAfficheHeader(affiche);
    });
  }, []);

  return (
    <TopNav.Navigator
      initialRouteName="RechercheUtilisateurScreen"
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: "red", // changer la couleur de l'indicateur
        },
        // hide bar
        tabBarStyle: { display: afficheHeader ? "flex" : "none" },
      }}
    >
      <TopNav.Screen
        name="RechercheRessourceScreen"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Ionicons name="images" color={color} size={25} />
            ) : (
              <Ionicons name="images-outline" color={color} size={25} />
            ),
        }}
        component={RessourceStackNavigator}
      />
      <TopNav.Screen
        name="RechercheUtilisateurScreen"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Ionicons name="person" color={color} size={25} />
            ) : (
              <Ionicons name="person-outline" color={color} size={25} />
            ),
        }}
        component={UtilisateurStackNavigator}
      />
    </TopNav.Navigator>
  );
}

export default RechercheScreenTopNavigator;
