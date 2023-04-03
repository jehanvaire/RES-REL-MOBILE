import { Center, Stack } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { View } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import RessourceSearchScreen from "./RessourceSearchScreen";
import UtilisateurSearchScreen from "./UtilisateurSearchScreen";
import { UtilisateurEntity } from "../../ressources/types/UtilisateurEntity";
import { storage } from "../../services/AuthentificationService";
import { AuthentificationEnum } from "../../ressources/enums/AuthentificationEnum";
import SearchService from "../../services/SearchService";
import PublicationService from "../../services/PublicationService";
import { BehaviorSubject } from "rxjs";
import Filtre from "../../components/Filtre";

const TopNav = createMaterialTopTabNavigator();

const PER_PAGE = 15;

const TopNavigator = () => {
  const [utilisateur, setUtilisateur] = useState<UtilisateurEntity>(
    {} as UtilisateurEntity
  );
  const [searchValue, setSeachValue] = React.useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    var user_json = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";

    var user = JSON.parse(user_json) as UtilisateurEntity;
    setUtilisateur(user);
  }, []);

  const startSearch = () => {
    if (searchValue !== "") {
      const params = {
        ressourceQuery: searchValue,
        utilisateurQuery: searchValue,
      };
      SearchService.Search(params).then((listeResultats) => {
        SearchService.SetListeResultats(listeResultats);
      });
    } else {
      PublicationService.GetAllPublications().then((listeResultats) => {
        SearchService.SetListeResultats(listeResultats);
      });
    }
  };

  // const handleRefresh = () => {
  //   setRefreshing(true);
  //   const params = { perPage: PER_PAGE };
  //   PublicationService.GetListePublicationsUtilisateur(1, params).then(
  //     (publications) => {
  //       setListeRecherche(publications);
  //     }
  //   );
  //   setRefreshing(false);
  // };

  useEffect(() => {
    const timer = setTimeout(() => {
      startSearch();
    }, 250);

    return () => clearTimeout(timer);
  }, [searchValue]);

  return (
    <>
      <View style={{ marginTop: 50, width: "100%" }}>
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

            <Filtre></Filtre>
          </Stack>
        </Center>
      </View>
      <TopNav.Navigator
        initialRouteName="RessourcesSearch"
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "red", // changer la couleur de l'indicateur
          },
        }}
      >
        <TopNav.Screen
          name="RessourcesSearch"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused, color }) =>
              focused ? (
                <Ionicons name="images" color={color} size={25} />
              ) : (
                <Ionicons name="images-outline" color={color} size={25} />
              ),
          }}
          component={RessourceSearchScreen}
        />
        <TopNav.Screen
          name="UtilisateursSearch"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused, color }) =>
              focused ? (
                <Ionicons name="person" color={color} size={25} />
              ) : (
                <Ionicons name="person-outline" color={color} size={25} />
              ),
          }}
          component={UtilisateurSearchScreen}
        />
      </TopNav.Navigator>
    </>
  );
};

export default TopNavigator;

const styles = StyleSheet.create({
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
