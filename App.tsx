import React from "react";
import { NativeBaseProvider, Text, Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import ListePublicationsScreen from "./pages/ListePublicationsScreen";
import NofificationScreen from "./pages/NotificationsScreen";
import ProfilScreen from "./pages/ProfilScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Ionicons from "react-native-vector-icons/Ionicons";
import SearchScreen from "./pages/SearchScreen";
import ConnexionScreen from "./pages/ConnexionScreen";
import { MMKV } from "react-native-mmkv";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
  const storage = new MMKV();

  // erase storage
  // storage.clearAll();

  const user = storage.getString("user_token");

  if (user == null) {
    // go to connexion screen if no user is connected
    // and add the option to go back to the main menu
    return (
      <NavigationContainer>
        <NativeBaseProvider>
          <Stack.Navigator initialRouteName="Connexion">
            <Stack.Screen name="Connexion" component={ConnexionScreen} />
            <Stack.Screen name="Menu" component={App} />
          </Stack.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer independent={true}>
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
}

export default App;
