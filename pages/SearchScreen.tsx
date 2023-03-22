import { Center, Spacer, Stack, FlatList } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text, TextInput } from "react-native";
import { View } from "native-base";
import { UtilisateurEntity } from "../ressources/types/UtilisateurEntity";
import { AuthentificationEnum } from "../ressources/enums/AuthentificationEnum";
import { storage } from "../services/AuthentificationService";
import Ionicons from "react-native-vector-icons/Ionicons";
import PublicationService from "../services/PublicationService";
import { PublicationEntity } from "../ressources/types/PublicationEntity";
import { createStackNavigator } from "@react-navigation/stack";
import DetailsPublication from "../components/Publication/DetailsPublication";
import FastImage from "react-native-fast-image";

const StackNav = createStackNavigator();

const PER_PAGE = 15;

// TODO: Recherche ressource, utilisateur, catégorie, groupes

function ListeRechercheScreen(props: any) {
  const [utilisateur, setUtilisateur] = useState<UtilisateurEntity>(
    {} as UtilisateurEntity
  );
  const [searchValue, setSeachValue] = React.useState("");
  const [listePublicationsRecherche, setListePublicationsRecherche] = useState<
    PublicationEntity[]
  >([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    var user_json = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";

    var user = JSON.parse(user_json) as UtilisateurEntity;
    setUtilisateur(user);
  }, []);

  const startSearch = () => {
    if (searchValue !== "") {
      PublicationService.GetAllPublications().then((listePublications) => {
        const liste = listePublications.filter((publication) => {
          return publication.titre
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        });

        setListePublicationsRecherche(liste);
      });
    } else {
      PublicationService.GetAllPublications().then((listePublications) => {
        setListePublicationsRecherche(listePublications);
      });
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    const params = { perPage: PER_PAGE };
    PublicationService.GetListePublicationsUtilisateur(1, params).then(
      (publications) => {
        setListePublicationsRecherche(publications);
      }
    );
    setRefreshing(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startSearch();
    }, 250);

    return () => clearTimeout(timer);
  }, [searchValue]);

  function AfficherPublication(publication: PublicationEntity) {
    props.navigation.navigate("DetailsPublication", {
      auteur: publication.auteur,
      titre: publication.titre,
      contenu: publication.contenu,
      status: publication.status,
      raisonRefus: publication.raisonRefus,
      dateCreation: publication.dateCreation,
      lienImage: publication.lienImage,
    });
  }

  const renderItem = useCallback(
    ({ item }: any) => (
      <TouchableOpacity
        key={item.id}
        onPress={() => {
          AfficherPublication(item);
        }}
      >
        <Stack style={styles.publicationPreview} direction="row">
          <Text style={styles.titrePreview}>
            {item.titre.substring(0, 20)}
            {item.titre.length > 20 ? "..." : ""}
          </Text>
          <Spacer />
          <Text style={styles.auteurPrewiew}>Adrien</Text>
          <FastImage
            style={styles.imagePrewiew}
            source={{
              uri: item.lienImage,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </Stack>
      </TouchableOpacity>
    ),
    []
  );

  return (
    <View style={styles.container}>
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

      <FlatList
        style={{ width: "100%" }}
        removeClippedSubviews={true}
        maxToRenderPerBatch={PER_PAGE}
        initialNumToRender={PER_PAGE}
        data={listePublicationsRecherche}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        keyExtractor={(item) => item.id.toString()}
      />

      <Spacer />
    </View>
  );
}

const RechercheStack = () => {
  return (
    <StackNav.Navigator initialRouteName="RechercheScreen">
      <StackNav.Screen
        name="RechercheScreen"
        component={ListeRechercheScreen}
        options={{ headerShown: false }}
      />
      <StackNav.Screen
        name="DetailsPublication"
        component={DetailsPublication}
        options={{ headerShown: true, title: "" }}
      />
    </StackNav.Navigator>
  );
};

export default RechercheStack;

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
