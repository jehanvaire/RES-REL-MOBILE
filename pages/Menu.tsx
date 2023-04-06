import React, { useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import RechercheScreen from "./Rercherche/RechercheScreen";
import NotificationScreen from "./NotificationsScreen";
import ListePublicationsScreen from "./ListePublicationsScreen";
import ProfilStackNavigator from "../components/Navigators/ProfilStackNavigator";
import ValidationRessourcesStackNavigator from "../components/Navigators/ValidationRessourcesStackNavigator";

const BottomTab = createMaterialBottomTabNavigator();

// The authenticated view
const Menu = () => {
  const [isAutorized, setIsAutorized] = useState(true);

  return (
    <BottomTab.Navigator
      initialRouteName="Recherche"
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
      <BottomTab.Screen name="Profil" component={ProfilStackNavigator} />

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
