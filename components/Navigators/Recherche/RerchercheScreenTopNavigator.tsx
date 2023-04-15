import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import RessourceStackNavigator from "./RessourceStackNavigator";
import UtilisateurStackNavigator from "./UtilisateurStackNavigator";

const TopNav = createMaterialTopTabNavigator();

function RechercheScreenTopNavigator() {
  return (
    <TopNav.Navigator
      initialRouteName="RechercheUtilisateurScreen"
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: "red", // changer la couleur de l'indicateur
        },
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
