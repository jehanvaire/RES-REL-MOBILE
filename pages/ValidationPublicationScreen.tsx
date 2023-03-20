import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { View } from "native-base";
import { UtilisateurEntity } from "../ressources/types/UtilisateurEntity";
import { AuthentificationEnum } from "../ressources/enums/AuthentificationEnum";
import { storage } from "../services/AuthentificationService";
import PublicationService from "../services/PublicationService";
import { PublicationEntity } from "../ressources/types/PublicationEntity";
import { createStackNavigator } from "@react-navigation/stack";
import DetailsPublication from "../components/Publication/DetailsPublication";
import ValidationPublicationComponent from "../components/Publication/ValidationPublicationComponent";

const StackNav = createStackNavigator();

const PER_PAGE = 15;

function ValidationRessourcesScreen(props: any) {
  const [utilisateur, setUtilisateur] = useState<UtilisateurEntity>(
    {} as UtilisateurEntity
  );
  const [listePublicationsEnAttente, setListePublicationsEnAttente] = useState<
    PublicationEntity[]
  >([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    var user_json = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";

    var user = JSON.parse(user_json) as UtilisateurEntity;
    setUtilisateur(user);
  }, []);

  const fetchPublicationsEnAttente = async () => {
    const params = { page: 1, perPage: PER_PAGE };
    const listePublications =
      await PublicationService.GetListePublicationsUtilisateur(1, params);
    setListePublicationsEnAttente(listePublications);
  };

  const handleLoadMore = () => {
    if (!loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      const params = { page: nextPage, perPage: PER_PAGE };
      PublicationService.GetListePublicationsUtilisateur(1, params).then(
        (publications) => {
          setListePublicationsEnAttente([
            ...listePublicationsEnAttente,
            ...publications,
          ]);
        }
      );
    }
  };

  const handleRefresh = () => {
    if (!loading) {
      setRefreshing(true);
      const firstPage = 1;
      setPage(firstPage);
      const params = { page: firstPage, perPage: PER_PAGE };
      PublicationService.GetListePublicationsUtilisateur(1, params).then(
        (publications) => {
          setListePublicationsEnAttente(publications);
        }
      );
      setRefreshing(false);
    }
  };

  const renderItem = useCallback(
    ({ item }: any) => (
      <ValidationPublicationComponent
        key={item.id}
        publication={item}
        navigation={props.navigation}
      ></ValidationPublicationComponent>
    ),
    []
  );

  useEffect(() => {
    fetchPublicationsEnAttente();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={listePublicationsEnAttente}
        removeClippedSubviews={true}
        maxToRenderPerBatch={PER_PAGE}
        initialNumToRender={PER_PAGE}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={PER_PAGE}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
}

const ValidationRessourcesStack = () => {
  return (
    <StackNav.Navigator initialRouteName="RechercheScreen">
      <StackNav.Screen
        name="RechercheScreen"
        component={ValidationRessourcesScreen}
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

export default ValidationRessourcesStack;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  listePublications: {
    padding: 10,
    width: "100%",
  },
});
