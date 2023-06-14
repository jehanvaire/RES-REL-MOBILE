import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, FlatList, Text } from "react-native";
import { View } from "native-base";
import { UtilisateurEntity } from "../ressources/models/UtilisateurEntity";
import { AuthentificationEnum } from "../ressources/enums/AuthentificationEnum";
import { storage } from "../services/AuthentificationService";
import PublicationService from "../services/PublicationService";
import { PublicationEntity } from "../ressources/models/PublicationEntity";
import ValidationPublicationComponent from "../components/Ressource/ValidationPublicationComponent";
import { SafeAreaView } from "react-native-safe-area-context";

const PER_PAGE = 15;

const ValidationRessourcesScreen = (props: any) => {
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

    PublicationService.getRechargerPublications().subscribe((recharger) => {
      if (recharger) {
        handleRefresh();
        PublicationService.setRechargerPublications(false);
      }
    });
  }, []);

  const fetchPublicationsEnAttente = async () => {
    const params = {
      page: 1,
      perPage: PER_PAGE,
      "status[equals]=": "PENDING",
      "partage[equals]=": "PUBLIC",
      include: "utilisateur,pieceJointe,categorie",
    };
    const listePublications = await PublicationService.GetPublications(params);
    setListePublicationsEnAttente(listePublications);
  };

  const handleLoadMore = () => {
    if (!loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      const params = {
        page: nextPage,
        perPage: PER_PAGE,
        "status[equals]=": "PENDING",
        "partage[equals]=": "PUBLIC",
        include: "utilisateur,pieceJointe,categorie",
      };
      PublicationService.GetPublications(params).then((publications) => {
        setListePublicationsEnAttente([
          ...listePublicationsEnAttente,
          ...publications,
        ]);
      });
    }
  };

  const handleRefresh = () => {
    if (!loading) {
      setRefreshing(true);
      const firstPage = 1;
      setPage(firstPage);
      const params = {
        page: firstPage,
        perPage: PER_PAGE,
        "status[equals]=": "PENDING",
        "partage[equals]=": "PUBLIC",
        include: "utilisateur,pieceJointe,categorie",
      };
      PublicationService.GetPublications(params).then((publications) => {
        setListePublicationsEnAttente(publications);
      });
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
    <>
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Validation de ressources</Text>
        </View>
      </SafeAreaView>
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
    </>
  );
};

export default ValidationRessourcesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#bbbbbb",
  },
  headerText: {
    fontSize: 24,
    color: "black",
    textAlign: "center",
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },

  listePublications: {
    padding: 10,
    width: "100%",
  },
});
