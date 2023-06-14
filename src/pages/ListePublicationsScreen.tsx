import { View, Image, FlatList } from "native-base";
import React, { useEffect, useState } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CreationRessourceScreen from "../components/Ressource/CreationRessourceScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import images from "../ressources/ListeImagesLocales";
import { AuthentificationEnum } from "../ressources/enums/AuthentificationEnum";
import { storage } from "../services/AuthentificationService";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { UtilisateurEntity } from "../ressources/models/UtilisateurEntity";
import PublicationService from "../services/PublicationService";
import { PublicationEntity } from "../ressources/models/PublicationEntity";
import Publication from "../components/Ressource/Publication";
import DetailsPublication from "../components/Ressource/DetailsPublication";
import EspaceCommentaireScreen from "./Publication/EspaceCommentaireScreen";

const StackNav = createStackNavigator();
const PER_PAGE = 15;

const HeaderComponent = () => {
  return (
    <View style={[styles.vendorHeader, styles.shadow]}>
      <Image source={images.logo} alt="icon" style={styles.logo} />
      <Text style={styles.headerText}>Ressources Relationnelles</Text>
    </View>
  );
};

function ListePublicationsScreen(props: any) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [moi, setMoi] = useState<UtilisateurEntity>({} as UtilisateurEntity);
  const [publications, setPublications] = useState<PublicationEntity[]>([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const user_json =
      storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";
    if (user_json === "") {
      setIsAuthenticated(false);

      const params = {
        "partage[equals]=": "PUBLIC",
        "status[equals]=": "APPROVED",
        orderBy: "dateCreation,desc",
        include: "categorie,utilisateur,pieceJointe",
      };

      PublicationService.GetPublications(params).then((res) => {
        setPublications(res);
      });
    } else {
      setIsAuthenticated(true);
      var user = JSON.parse(user_json) as UtilisateurEntity;
      setMoi(user);

      const params = {
        fromRelations: 3, // Remplacer avec user.id
        "partage[equals]=": "PUBLIC",
        "status[equals]=": "APPROVED",
        include: "categorie,utilisateur,pieceJointe",
      };

      PublicationService.GetPublications(params).then((res) => {
        setPublications(res);
      });
    }
  }, []);

  const navigateToCreation = () => {
    props.navigation.navigate("CreationRessourceScreen");
  };

  const [fontsLoaded] = useFonts({
    "Sansita-Swashed":
      require("../assets/fonts/SansitaSwashed-Light.ttf") as any,
    "Sansita-Swashed-Bold":
      require("../assets/fonts/SansitaSwashed-Bold.ttf") as any,
    "Sansita-Swashed-Black":
      require("../assets/fonts/SansitaSwashed-Black.ttf") as any,
    "Sansita-Swashed-SemiBold":
      require("../assets/fonts/SansitaSwashed-SemiBold.ttf") as any,
  });

  //TODO en vrai éviter ça
  if (!fontsLoaded) {
    return null;
  }

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    let params = {};

    if (isAuthenticated) {
      params = {
        page: nextPage,
        perPage: PER_PAGE,
        "idUtilisateur[equals]=": 3, //moi.id,
        "partage[equals]=": "PUBLIC",
        "status[equals]=": "APPROVED",
        include: "utilisateur,categorie,pieceJointe",
      };
    } else {
      params = {
        "partage[equals]=": "PUBLIC",
        "status[equals]=": "APPROVED",
        include: "categorie,utilisateur,pieceJointe",
      };
    }
    PublicationService.GetPublications(params).then((publis) => {
      setPublications([...publications, ...publis]);
    });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    const firstPage = 1;
    setPage(firstPage);
    let params = {};

    if (isAuthenticated) {
      params = {
        page: firstPage,
        perPage: PER_PAGE,
        "idUtilisateur[equals]=": 3, //moi.id,
        "partage[equals]=": "PUBLIC",
        "status[equals]=": "APPROVED",
        include: "utilisateur,categorie,pieceJointe",
      };
    } else {
      params = {
        "partage[equals]=": "PUBLIC",
        "status[equals]=": "APPROVED",
        include: "categorie,utilisateur,pieceJointe",
      };
    }
    PublicationService.GetPublications(params).then((publications) => {
      console.log(publications.length);
      setPublications(publications);
    });
    setRefreshing(false);
  };

  const renderItem = ({ item }: any) => (
    <View key={item.id + item.idPieceJointe + item.idUtilisateur}>
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
        navigation={props.navigation}
        idUtilisateur={item.utilisateur.id}
        authentifie={isAuthenticated}
      />
    </View>
  );

  return (
    <>
      <SafeAreaView>
        <HeaderComponent />
      </SafeAreaView>
      <View style={styles.container}>
        <StatusBar />

        <BoutonAjoutPublication
          isAuthenticated={isAuthenticated}
          onPress={navigateToCreation}
        />
        <GestureHandlerRootView>
          {/* Liste des publications */}
          <FlatList
            style={styles.listePublications}
            removeClippedSubviews={true}
            maxToRenderPerBatch={PER_PAGE}
            initialNumToRender={PER_PAGE}
            data={publications}
            keyExtractor={(item: any) => item.id.toString()}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={PER_PAGE}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            renderItem={renderItem}
          />
        </GestureHandlerRootView>
      </View>
    </>
  );
}

const BoutonAjoutPublication = ({
  isAuthenticated,
  onPress,
}: {
  isAuthenticated: boolean;
  onPress: () => void;
}) => {
  // Show button only if user is logged in
  if (isAuthenticated) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.ajoutPublicationButton}>
        <Ionicons name="add-outline" size={36} color="#FFFFFF" />
      </TouchableOpacity>
    );
  }
  return null;
};

const ListePublicationStack = () => {
  return (
    <StackNav.Navigator initialRouteName="ListePublicationsScreen">
      <StackNav.Screen
        name="ListePublicationsScreen"
        component={ListePublicationsScreen}
        options={{ headerShown: false }}
      />
      <StackNav.Screen
        name="DetailsPublication"
        component={DetailsPublication}
        options={{ headerShown: true, title: "" }}
      />
      <StackNav.Screen
        name="CreationRessourceScreen"
        component={CreationRessourceScreen}
        options={{ headerShown: true, title: "Créer une ressource" }}
      />
      <StackNav.Screen
        name="EspaceCommentaireScreen"
        component={EspaceCommentaireScreen}
      />
    </StackNav.Navigator>
  );
};

export default ListePublicationStack;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#BBBBBB",
    height: "96%",
  },
  vendorHeader: {
    backgroundColor: "#FFFFFF",
    height: 60,
    overflow: "visible",
    alignItems: "center",
    zIndex: 1000,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontFamily: Platform.OS === "ios" ? "Arial" : "Sansita-Swashed-SemiBold",
    color: "#000000",
    textAlign: "center",
  },
  logo: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    position: "absolute",
    left: 10,
    marginTop: 10,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 2,
  },
  ajoutPublicationButton: {
    position: "absolute",
    right: "4%",
    bottom: "14%",
    backgroundColor: "#4183F4",
    borderRadius: 50,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  buttonText: {
    fontSize: 36,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  listePublications: {
    width: "100%",
    alignSelf: "center",
    marginBottom: 30,
  },
});
