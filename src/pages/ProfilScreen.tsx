import { Box, Center, Spacer, Avatar, Stack, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, BackHandler } from "react-native";
import { View } from "native-base";
import PublicationService from "../services/PublicationService";
import { UtilisateurEntity } from "../ressources/models/UtilisateurEntity";
import Description from "../components/Description";
import MenuHamburgerProfil from "../components/MenuHamburgerProfil";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Publication from "../components/Ressource/Publication";
import { PublicationEntity } from "../ressources/models/PublicationEntity";
import RechercheService from "../services/RechercheService";

const PER_PAGE = 10;
const apiURL = "https://api.victor-gombert.fr/api/v1/utilisateurs";

const ProfilScreen = (props: any) => {
  const { navigation } = props;
  const autreUtilisateur = props.route.params.autreUtilisateur;
  const utilisateur: UtilisateurEntity = props.route.params.utilisateur;
  const [listePublications, setListePublications] = useState<
    PublicationEntity[]
  >([]);

  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchListePublicationsUtilisateur();
    const params = {
      id: utilisateur.id,
    };
  }, []);

  useEffect(() => {
    const retourHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        RechercheService.SetAfficheHeader(true);
        navigation.goBack();
        return true;
      }
    );
    return () => retourHandler.remove();
  }, []);

  const fetchListePublicationsUtilisateur = async () => {
    // Get the list of publications
    const params = {
      page: 1,
      perPage: PER_PAGE,
      "idUtilisateur[equals]=": utilisateur.id,
      include: "utilisateur",
    };
    const listePublications = await PublicationService.GetPublications(params);
    setListePublications(listePublications);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    const params = {
      page: nextPage,
      perPage: PER_PAGE,
      "idUtilisateur[equals]=": utilisateur.id,
      include: "utilisateur",
    };
    PublicationService.GetPublications(params).then((publications) => {
      setListePublications([...listePublications, ...publications]);
    });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    const firstPage = 1;
    setPage(firstPage);
    const params = {
      page: firstPage,
      perPage: PER_PAGE,
      "idUtilisateur[equals]=": utilisateur.id,
      include: "utilisateur",
    };
    PublicationService.GetPublications(params).then((publications) => {
      setListePublications(publications);
    });
    setRefreshing(false);
  };

  const renderItem = ({ item }: any) => (
    <View key={item.id}>
      <Publication
        id={item.idUtilisateur}
        auteur={item.utilisateur.nom + " " + item.utilisateur.prenom}
        titre={item.titre}
        contenu={item.contenu}
        status={item.status}
        raisonRefus={item.raisonRefus}
        dateCreation={item.dateCreation}
        navigation={navigation}
        utilisateurId={utilisateur.id}
      />
    </View>
  );

  return (
    <GestureHandlerRootView>
      <View
        style={
          autreUtilisateur ? styles.containerAutreUtilisateur : styles.container
        }
      >
        <Stack direction="row" style={styles.header}>
          <Avatar
            size={100}
            source={{
              uri: apiURL + "/" + utilisateur.id + "/download",
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

        <Description contenu={utilisateur.bio ?? ""}></Description>

        <Text style={styles.title}>Publications {utilisateur.id}</Text>
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
};

export default ProfilScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  containerAutreUtilisateur: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
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
