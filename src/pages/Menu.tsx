import React, { useEffect, useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import RechercheScreen from "./Rercherche/RechercheScreen";
import NotificationScreen, { getNumberOfNotifications } from "./NotificationsScreen";
import ListePublicationsScreen from "./ListePublicationsScreen";
import ProfilStackNavigator from "../components/Navigators/ProfilStackNavigator";
import ValidationRessourcesStackNavigator from "../components/Navigators/ValidationRessourcesStackNavigator";
import { UtilisateurEntity } from "../ressources/models/UtilisateurEntity";
import { storage } from "../services/AuthentificationService";
import { AuthentificationEnum } from "../ressources/enums/AuthentificationEnum";

const BottomTab = createMaterialBottomTabNavigator();

// The authenticated view
const Menu = ({ props }: any) => {
  const [isAutorized, setIsAutorized] = useState(true);
  const [utilisateur, setUtilisateur] = useState<UtilisateurEntity>(
    {} as UtilisateurEntity
  );
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    var user_json = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";
    var user = JSON.parse(user_json) as UtilisateurEntity;
    setUtilisateur(user);
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [utilisateur]);

  return loading ? null : (
    <BottomTab.Navigator
      initialRouteName="Menu"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          switch (route.name) {
            case "Menu":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Recherche":
              iconName = focused ? "search" : "search-outline";
              break;
            case "Notifications":
              iconName = focused ? "notifications" : "notifications-outline";
              break;
            case "Profil":
              iconName = focused ? "person" : "person-outline";
              break;
            default:
              iconName = focused ? "home" : "home-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={25} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <BottomTab.Screen name="Menu" component={ListePublicationsScreen} />
      <BottomTab.Screen name="Recherche" component={RechercheScreen} />
      <BottomTab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{ tabBarBadge: 3 }}
      />
      <BottomTab.Screen
        name="Profil"
        component={ProfilStackNavigator}
        initialParams={{
          currentUser: true,
          utilisateur: utilisateur,
        }}
      />

      {isAutorized ? (
        <>
          <BottomTab.Screen
            name="Validation ressources"
            component={ValidationRessourcesStackNavigator}
          />
        </>
      ) : null}
    </BottomTab.Navigator>
  );
};

export default Menu;
