import { Center, Spacer, Stack, Text, VStack } from "native-base";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  BackHandler,
  StatusBar,
  Animated,
  TouchableOpacity,
} from "react-native";
import { View } from "native-base";
import PublicationService from "../services/PublicationService";
import { UtilisateurEntity } from "../ressources/models/UtilisateurEntity";
import Description from "../components/Description";
import MenuHamburgerProfil from "../components/MenuHamburgerProfil";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Publication from "../components/Ressource/Publication";
import { PublicationEntity } from "../ressources/models/PublicationEntity";
import RechercheService from "../services/RechercheService";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthentificationEnum } from "../ressources/enums/AuthentificationEnum";
import { storage } from "../services/AuthentificationService";
import RelationService from "../services/RelationService";

const PER_PAGE = 10;
const apiURL = "https://api.victor-gombert.fr/api/v1/utilisateurs";

const HEADER_MAX_HEIGHT = 150;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

function ProfilScreen(props: any) {
  const { navigation } = props;
  const autreUtilisateur = props.route.params.autreUtilisateur;
  const utilisateur: UtilisateurEntity = props.route.params.utilisateur;
  const [listePublications, setListePublications] = useState<
    PublicationEntity[]
  >([]);
  const [moi, setMoi] = useState<UtilisateurEntity>({} as UtilisateurEntity);
  // const [listeRelations, setListeRelations] = useState<RelationEntity[]>([]);
  const [estEnRelation, setEstEnRelation] = useState<boolean>(false);
  const [relationEnAttente, setRelationEnAttente] = useState<boolean>(false);

  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [headerDescriptionExpanded, setHeaderDescriptionExpanded] =
    useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      fetchListePublicationsUtilisateur();
    }, [])
  );

  useEffect(() => {
    var user_json = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";

    var user = JSON.parse(user_json) as UtilisateurEntity;
    setMoi(user);

    // const params = {
    //   "idDemandeur[equals]=": user.id,
    //   "idReceveur[equals]=": utilisateur.id,
    // };

    // RelationService.GetRelations(params).then((response) => {
    //   console.log(response);
    //   if (response.length > 0) {
    //     setEstEnRelation(true);
    //   }
    // });

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

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const headerDescriptionHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT + 100, HEADER_MIN_HEIGHT + 100],
    extrapolate: "clamp",
  });

  const headerElementsOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const headerElementsTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -50],
    extrapolate: "clamp",
  });

  const titreTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -10],
    extrapolate: "clamp",
  });

  const avatarSize = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [100, 40],
    extrapolate: "clamp",
  });

  const containterAutreUtilisateurWidth = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: ["65%", "80%"],
    extrapolate: "clamp",
  });

  useEffect(() => {
    setHeaderDescriptionExpanded(descriptionExpanded);
  }, [descriptionExpanded]);

  useEffect(() => {
    const listener = scrollY.addListener((value) => {
      const scrollPosition = value.value;
      if (scrollPosition > 0) {
        setHeaderDescriptionExpanded(false);
      } else if (descriptionExpanded) {
        setHeaderDescriptionExpanded(true);
      }
    });

    checkSiEnRelation();

    return () => {
      scrollY.removeListener(listener);
    };
  }, []);

  const fetchListePublicationsUtilisateur = async () => {
    const params = {
      page: 1,
      perPage: PER_PAGE,
      "idUtilisateur[equals]=": utilisateur.id,
      include: "utilisateur,categorie,pieceJointe",
      sortBy: "id,desc",
    };
    const listePublications = await PublicationService.GetPublications(params);
    setListePublications(listePublications);
  };

  const checkSiEnRelation = () => {
    const demandesRelationsParams = {
      "idDemandeur[equals]=": moi.id,
      "idReceveur[equals]=": utilisateur.id,
    };

    const receveurRelationsParams = {
      "idDemandeur[equals]=": utilisateur.id,
      "idReceveur[equals]=": moi.id,
    };

    RelationService.GetRelation(demandesRelationsParams).then((response) => {
      if (response.accepte) {
        setEstEnRelation(true);
      }
    });

    RelationService.GetRelation(receveurRelationsParams).then((response) => {
      if (response.accepte) {
        setEstEnRelation(true);
      }
    });
  };

  // TODO: afficher select avec les types de relations
  const demanderConnexionUtilisateur = () => {
    const params = {
      idDemandeur: moi.id,
      idReceveur: utilisateur.id,
      typeRelation: 5,
    };

    console.log(params);
    RelationService.DemanderRelation(params).then((response) => {
      console.log(response);
      checkSiEnRelation();
    });
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    const params = {
      page: nextPage,
      perPage: PER_PAGE,
      "idUtilisateur[equals]=": utilisateur.id,
      include: "utilisateur,categorie,pieceJointe",
      zIndex: 10,
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
      include: "utilisateur,categorie,pieceJointe",
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
        categorie={item.categorie.nom}
        idPieceJointe={item.pieceJointe?.id}
        typePieceJointe={item.pieceJointe?.type}
        dateActivite={item.pieceJointe?.dateActivite}
        lieuActivite={item.pieceJointe?.lieu}
        codePostalActivite={item.pieceJointe?.codePostal}
        contenu={item.contenu}
        status={item.status}
        raisonRefus={item.raisonRefus}
        dateCreation={item.dateCreation}
        navigation={navigation}
        idUtilisateur={utilisateur.id}
      />
    </View>
  );

  const banniereProfilUtilisateur = () => {
    return (
      <Animated.View
        style={[
          styles.header,
          styles.shadow,
          {
            height:
              headerDescriptionExpanded && descriptionExpanded
                ? headerDescriptionHeight
                : headerHeight,
            width: autreUtilisateur ? containterAutreUtilisateurWidth : "100%",
          },
        ]}
      >
        <Stack style={styles.flex}>
          <Animated.Image
            style={[
              styles.avatar,
              {
                height: avatarSize,
                width: avatarSize,
                borderRadius: 50,
              },
            ]}
            source={{
              uri: apiURL + "/" + utilisateur.id + "/download",
            }}
          />

          <VStack
            marginLeft={3}
            style={{ marginTop: 30, alignItems: "center" }}
          >
            <Animated.View
              style={{
                transform: [{ translateY: titreTranslateY }],
              }}
            >
              <Text style={styles.title}>
                {utilisateur.nom} {utilisateur.prenom}
              </Text>
            </Animated.View>

            <Animated.View
              style={{
                opacity: headerElementsOpacity,
                transform: [{ translateY: headerElementsTranslateY }],
              }}
            >
              <Description
                contenu={utilisateur.bio ?? ""}
                onDescExpand={() =>
                  setDescriptionExpanded(!descriptionExpanded)
                }
              />
            </Animated.View>
          </VStack>

          <Spacer />

          <Animated.View
            style={{
              opacity: headerElementsOpacity,
              transform: [{ translateY: headerElementsTranslateY }],
              marginTop: 30,
            }}
          >
            <Center>
              <MenuHamburgerProfil navigation={navigation} />
            </Center>
          </Animated.View>
        </Stack>
      </Animated.View>
    );
  };

  return (
    <GestureHandlerRootView>
      <StatusBar translucent backgroundColor="transparent" />

      <View>
        {autreUtilisateur ? (
          <View style={styles.containerAutreUtilisateur}>
            {banniereProfilUtilisateur()}
          </View>
        ) : (
          <SafeAreaView style={styles.container}>
            {banniereProfilUtilisateur()}
          </SafeAreaView>
        )}

        <View style={styles.relations}>
          <Stack direction="row">
            <Text style={styles.title}>102 Relations</Text>
            <Spacer />
            {autreUtilisateur && !estEnRelation && (
              <TouchableOpacity
                style={styles.buttonDemandeConnexion}
                onPress={demanderConnexionUtilisateur}
              >
                <Text>Demander connexion</Text>
              </TouchableOpacity>
            )}

            {estEnRelation && autreUtilisateur && (
              <TouchableOpacity
                style={styles.buttonGererConnexion}
                onPress={() =>
                  navigation.navigate("GererConnexion", {
                    utilisateur: utilisateur,
                  })
                }
              >
                <Text>Gérer connexion</Text>
              </TouchableOpacity>
            )}
          </Stack>
        </View>

        <Animated.FlatList
          style={styles.listePublications}
          removeClippedSubviews={true}
          maxToRenderPerBatch={PER_PAGE}
          initialNumToRender={PER_PAGE}
          data={listePublications}
          keyExtractor={(item: any) => item.id.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={PER_PAGE}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          renderItem={renderItem}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        />
      </View>
    </GestureHandlerRootView>
  );
}

export default ProfilScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  containerAutreUtilisateur: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  relations: {
    width: "100%",
    alignSelf: "center",
    marginVertical: 25,
  },
  buttonDemandeConnexion: {
    backgroundColor: "#44BE80",
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  buttonGererConnexion: {
    backgroundColor: "#F39C12",
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  flex: {
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 1,
  },
  avatar: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  bio: {
    marginBottom: 10,
  },
  listePublications: {
    width: "100%",
    alignSelf: "center",
    marginBottom: 160,
  },
});
