import { Center, Stack } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { View } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import RessourceSearchScreen from "./RessourceSearchScreen";
import UtilisateurSearchScreen from "./UtilisateurSearchScreen";

const TopNav = createMaterialTopTabNavigator();

// TODO: Recherche ressource, utilisateur, catégorie, groupes

const TopNavigator = () => {
  const [searchValue, setSeachValue] = React.useState("");

  return (
    <>
      <View style={{ marginTop: 50 }}>
        <Center style={styles.searchStack}>
          <Stack direction="row">
            <TextInput
              style={styles.textInput}
              onChangeText={setSeachValue}
              value={searchValue}
              placeholder="Ressource, utilisateur, catégoie..."
              returnKeyType="search"
            />
            <TouchableOpacity>
              <Ionicons
                name="search-outline"
                size={25}
                style={[styles.searchIcon]}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                name="options-outline"
                size={25}
                style={[styles.searchIcon]}
              />
            </TouchableOpacity>
          </Stack>
        </Center>
      </View>
      <TopNav.Navigator
        initialRouteName="Screen 1"
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "red", // changer la couleur de l'indicateur
          },
        }}
      >
        <TopNav.Screen
          name="UtilisateursSearch"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused, color }) =>
              focused ? (
                <Ionicons name="images" color={color} size={25} />
              ) : (
                <Ionicons name="images-outline" color={color} size={25} />
              ),
          }}
          component={UtilisateurSearchScreen}
        />
        <TopNav.Screen
          name="RessourcesSearch"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused, color }) =>
              focused ? (
                <Ionicons name="person" color={color} size={25} />
              ) : (
                <Ionicons name="person-outline" color={color} size={25} />
              ),
          }}
          component={RessourceSearchScreen}
        />
      </TopNav.Navigator>
    </>
  );
};

export default TopNavigator;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  searchStack: {
    backgroundColor: "white",
    height: 50,
    width: "100%",
  },
  textInput: {
    height: 40,
    fontSize: 15,
    paddingLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    width: "75%",
    borderColor: "gray",
    borderWidth: 1,
  },
  searchIcon: {
    color: "black",
    marginTop: 5,
    marginRight: 10,
  },
  listePublications: {
    padding: 10,
    width: "100%",
  },
  publicationPreview: {
    backgroundColor: "white",
    height: 50,
    width: "100%",
    marginBottom: 10,
    borderRadius: 10,
  },
  titrePreview: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  auteurPrewiew: {
    fontSize: 15,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 10,
  },
  imagePrewiew: {
    height: 42,
    width: 42,
    borderRadius: 10,
    marginTop: 4,
    marginBottom: 4,
    marginRight: 4,
  },
});
