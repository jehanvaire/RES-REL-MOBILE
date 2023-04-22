import { Box, Center, Spacer, Avatar, Stack, Text } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { View } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FavorisScreen from "../../pages/MenuProfilUtilisateur/FavorisScreen";
import GestionCategoriesScreen from "../../pages/MenuProfilUtilisateur/GestionCategoriesScreen";
import GestionComptesAdministrateursScreen from "../../pages/MenuProfilUtilisateur/GestionComptesAdministrateursScreen";
import GestionComptesUtilisateursScreen from "../../pages/MenuProfilUtilisateur/GestionComptesUtilisateursScreen";
import ParametresScreen from "../../pages/MenuProfilUtilisateur/ParametresScreen";
import PublicationsEnregistreesScreen from "../../pages/MenuProfilUtilisateur/PublicationsEnregistrees";
import StatistiquesScreen from "../../pages/MenuProfilUtilisateur/StatistiquesScreen";
import { AuthentificationEnum } from "../../ressources/enums/AuthentificationEnum";
import { PublicationEntity } from "../../ressources/models/PublicationEntity";
import { UtilisateurEntity } from "../../ressources/models/UtilisateurEntity";
import { storage } from "../../services/AuthentificationService";
import PublicationService from "../../services/PublicationService";
import Description from "../Description";
import MenuHamburgerProfil from "../MenuHamburgerProfil";
import DetailsPublication from "./DetailsPublication";
import Publication from "./Publication";

export const StackNav = createStackNavigator();

const PER_PAGE = 10;

function ProfilScreen({ navigation }: any) {
  const [listePublications, setListePublications] = useState<
    PublicationEntity[]
  >([]);
  const [utilisateur, setUtilisateur] = useState<UtilisateurEntity>(
    {} as UtilisateurEntity
  );

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchListePublicationsUtilisateur = async () => {
    // Get the list of publications
    const params = { page: 1, perPage: PER_PAGE };
    const listePublications =
      await PublicationService.GetListePublicationsUtilisateur(1, params);
    setListePublications(listePublications);
  };

  const handleLoadMore = () => {
    if (!loading) {
      const nextPage = page + 1;
      setPage(nextPage);

      const params = { page: nextPage, perPage: PER_PAGE };
      PublicationService.GetListePublicationsUtilisateur(1, params).then(
        (publications) => {
          setListePublications([...listePublications, ...publications]);
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
          setListePublications(publications);
        }
      );
      setRefreshing(false);
    }
  };

  const renderItem = ({ item }: any) => (
    <View key={item.id}>
      <Publication
        auteur={item.auteur}
        titre={item.titre}
        contenu={item.contenu}
        status={item.status}
        raisonRefus={item.raisonRefus}
        dateCreation={item.dateCreation}
        lienImage={item.lienImage}
        navigation={navigation}
      />
    </View>
  );

  useEffect(() => {
    var user_json = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";
    fetchListePublicationsUtilisateur();

    var user = JSON.parse(user_json) as UtilisateurEntity;
    setUtilisateur(user);
  }, []);

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <Stack direction="row" style={styles.header}>
          <Avatar
            size={100}
            source={{
              uri: utilisateur.lienPhoto,
            }}
          ></Avatar>

          <Center marginLeft={2}>
            <Text style={styles.title}>
              {utilisateur.nom} {utilisateur.prenom}
            </Text>
          </Center>

          <Spacer />

          <Center>
            <MenuHamburgerProfil navigation={navigation}></MenuHamburgerProfil>
          </Center>
        </Stack>

        <Description contenu={utilisateur.contenu ?? ""}></Description>

        <Text style={styles.title}>Publications</Text>
        <Box
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "black",
            marginTop: 10,
            marginBottom: 10,
          }}
        ></Box>

        <FlatList
          style={{ marginBottom: 200 }}
          removeClippedSubviews={true}
          maxToRenderPerBatch={PER_PAGE}
          initialNumToRender={PER_PAGE}
          data={listePublications}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={PER_PAGE}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          renderItem={renderItem}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const ProfilStack = () => {
  return (
    <StackNav.Navigator initialRouteName="ProfilScreen">
      <StackNav.Screen
        name="ProfilScreen"
        component={ProfilScreen}
        options={{ headerShown: false }}
      />
      <StackNav.Screen
        name="Publication"
        component={Publication}
        options={{ headerShown: false }}
      />
      <StackNav.Screen
        name="DetailsPublication"
        component={DetailsPublication}
        options={{ headerShown: true, title: "" }}
      />
      <StackNav.Screen
        name="GestionComptesAdministrateursScreen"
        component={GestionComptesAdministrateursScreen}
      />
      <StackNav.Screen
        name="GestionCategoriesScreen"
        component={GestionCategoriesScreen}
      />
      <StackNav.Screen
        name="GestionComptesUtilisateursScreen"
        component={GestionComptesUtilisateursScreen}
      />
      <StackNav.Screen
        name="StatistiquesScreen"
        component={StatistiquesScreen}
      />
      <StackNav.Screen name="ParametresScreen" component={ParametresScreen} />
      <StackNav.Screen name="FavorisScreen" component={FavorisScreen} />
      <StackNav.Screen
        name="PublicationsEnregistrees"
        component={PublicationsEnregistreesScreen}
      />
    </StackNav.Navigator>
  );
};

export default ProfilStack;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    margin: 10,
    marginTop: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  contenu: {
    margin: 10,
    marginTop: 5,
    fontSize: 15,
  },
});
