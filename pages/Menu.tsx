import React, { useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProfilScreen from "./ProfilScreen";
import SearchScreen from "./SearchScreen";
import NotificationScreen from "./NotificationsScreen";
import ListePublicationsScreen from "./ListePublicationsScreen";
import ValidationRessourcesStack from "./ValidationPublicationScreen";

const Tab = createMaterialBottomTabNavigator();

// The authenticated view
const Menu = () => {
  const [isAutorized, setIsAutorized] = useState(true);

  return (
    <Tab.Navigator
      initialRouteName="Validation ressources"
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
      <Tab.Screen name="Menu" component={ListePublicationsScreen} />
      <Tab.Screen name="Recherche" component={SearchScreen} />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{ tabBarBadge: 3 }}
      />
      <Tab.Screen name="Profil" component={ProfilScreen} />

      {isAutorized ? (
        <>
          <Tab.Screen
            name="Validation ressources"
            component={ValidationRessourcesStack}
          />
        </>
      ) : null}
    </Tab.Navigator>
  );
};

export default Menu;
