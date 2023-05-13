import React, { useEffect, useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import RechercheScreen from "./Rercherche/RechercheScreen";
import NotificationScreen, {
  getNumberOfNotifications,
} from "./NotificationsScreen";
import ListePublicationsScreen from "./ListePublicationsScreen";
import ProfilStackNavigator from "../components/Navigators/ProfilStackNavigator";
import ValidationRessourcesStackNavigator from "../components/Navigators/ValidationRessourcesStackNavigator";
import { UtilisateurEntity } from "../ressources/models/UtilisateurEntity";
import { storage } from "../services/AuthentificationService";
import { AuthentificationEnum } from "../ressources/enums/AuthentificationEnum";
import { StyleSheet } from "react-native";

const BottomTab = createMaterialBottomTabNavigator();

// The authenticated view
const Menu = ({ props }: any) => {
  const [utilisateur, setUtilisateur] = useState<UtilisateurEntity>(
    {} as UtilisateurEntity
  );
  const [isAutorized, setIsAutorized] = useState(!!utilisateur.id);
  const [loading, setIsLoading] = useState(true);
  const gestureHandlerRef = React.createRef();

  useEffect(() => {
    var user_json = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";
    if (user_json !== "") {
      var user = JSON.parse(user_json) as UtilisateurEntity;
      setUtilisateur(user);
    } else {
      setUtilisateur({} as UtilisateurEntity);
    }
  }, []);

  //TODO: A continuer pour les roles par défaut
  // useEffect(() => {
  //   if (utilisateur.role) {
  //     setIsAutorized(utilisateur.role >= utilisateur.role);
  //   } else {
  //     setIsAutorized(false);
  //   }
  // }, [utilisateur]);

  useEffect(() => {
    setIsAutorized(true);
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [utilisateur]);

  return loading ? null : (
    <BottomTab.Navigator
      initialRouteName="Menu"
      barStyle={styles.bottomTabBar}
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
          gestureHandlerRef: gestureHandlerRef,
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

const styles = StyleSheet.create({
  bottomTabBar: {
    backgroundColor: "#fff",
  },
});
