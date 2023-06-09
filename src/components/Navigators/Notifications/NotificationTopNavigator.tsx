import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import RechercheService from "../../../services/RechercheService";
import NotifsActivitesNavigator from "./NotifsActivitesNavigator";
import NotifsRelationsNavigator from "./NotifsRelationsNavigator";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";

const TopNav = createMaterialTopTabNavigator();

function NotificationTopNavigator() {
  const [afficheHeader, setAfficheHeader] = useState(true);

  useEffect(() => {
    RechercheService.GetAfficheHeader().subscribe((affiche) => {
      setAfficheHeader(affiche);
    });
  }, []);

  return (
    <>
      <SafeAreaView style={{ backgroundColor: "white" }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Notifications</Text>
        </View>
      </SafeAreaView>

      <TopNav.Navigator
        initialRouteName="NotificationsActivitesScreen"
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "red", // changer la couleur de l'indicateur
          },
          // hide bar
          // tabBarStyle: { display: afficheHeader ? "flex" : "none" },
        }}
      >
        <TopNav.Screen
          name="NotificationsActivitesScreen"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused, color }) =>
              focused ? (
                <Ionicons name="browsers" color={color} size={25} />
              ) : (
                <Ionicons name="browsers-outline" color={color} size={25} />
              ),
          }}
          component={NotifsActivitesNavigator}
        />
        <TopNav.Screen
          name="NotificationsRelationsScreen"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused, color }) =>
              focused ? (
                <Ionicons name="people" color={color} size={25} />
              ) : (
                <Ionicons name="people-outline" color={color} size={25} />
              ),
          }}
          component={NotifsRelationsNavigator}
        />
      </TopNav.Navigator>
    </>
  );
}

export default NotificationTopNavigator;

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    color: "black",
    textAlign: "center",
    flex: 1,
  },
});
