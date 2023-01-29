import React from "react";
// 1. import `NativeBaseProvider` component
import { NativeBaseProvider, Text, Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import ListePublicationsScreen from "./pages/ListePublicationsScreen";
import NofificationScreen from "./pages/NotificationsScreen";
import ProfilScreen from "./pages/ProfilScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchScreen from "./pages/SearchScreen";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Tab.Navigator
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
                  iconName = focused
                    ? "notifications"
                    : "notifications-outline";
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
          <Tab.Screen name="Notifications" component={NofificationScreen} />
          <Tab.Screen name="Profil" component={ProfilScreen} />
        </Tab.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
