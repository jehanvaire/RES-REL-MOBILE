import { Box, ScrollView, View, Image } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Publication from "../components/Ressource/Publication";
import { StatusPublicationEnum } from "../ressources/enums/StatusPublicationEnum";
import CreationRessourceScreen from "../components/Ressource/CreationRessourceScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import AjouterPJScreen from "../components/Ressource/AjouterPJScreen";
import { Provider as PaperProvider } from "react-native-paper";
import images from "../ressources/ListeImagesLocales";
//importe mode invité de AuthentificationMenuScreen
import { AuthentificationEnum } from "../ressources/enums/AuthentificationEnum";
import { storage } from "../services/AuthentificationService";
import { useFonts } from "expo-font";

const HeaderComponent = () => {
  return (
    <View style={[styles.vendorHeader, styles.shadow]}>
      <Image source={images.logo} alt="icon" style={styles.logo} />
      <Text style={styles.headerText}>Ressources Relationnelles</Text>
    </View>
  );
};

function ListePublicationsScreen({ navigation }: any) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const user_json = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";
    if (user_json !== "") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const navigateToCreation = () => {
    navigation.navigate("CreationRessourceScreen");
  };

  const [fontsLoaded] = useFonts({
    'Sansita-Swashed': require('../assets/fonts/SansitaSwashed-Light.ttf') as any,
    'Sansita-Swashed-Bold': require('../assets/fonts/SansitaSwashed-Bold.ttf') as any,
    'Sansita-Swashed-Black': require('../assets/fonts/SansitaSwashed-Black.ttf') as any,
    'Sansita-Swashed-SemiBold': require('../assets/fonts/SansitaSwashed-SemiBold.ttf') as any,
  });

  //TODO en vrai éviter ça
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Box style={styles.container}>
      <CustomButton isAuthenticated={isAuthenticated} onPress={navigateToCreation} />
      <HeaderComponent />
      <GestureHandlerRootView>
        <ScrollView style={styles.scrollView}>
          <Publication
            id="1"
            utilisateurId="2"
            idPieceJointe="2"
            auteur="Adrien"
            titre="Mais quel drip indécent !"
            categorie="Culture"
            contenu="Le Pape francois est doté d'un style vestimentaire unique. En effet Gucci a décidé de lui offrir un ensemble de vêtements d'une valeur de 1 000 000 de dollars, pièce unique au monde."
            status={StatusPublicationEnum.ENATTENTE}
            typePieceJointe='IMAGE'
            raisonRefus={undefined}
            dateCreation={new Date(2023, 0, 28, 15, 10, 30)}
            lienImage="https://voi.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fprismamedia_people.2F2017.2F06.2F30.2F598687b0-716f-4a58-9d64-1d07df43565b.2Ejpeg/2048x1536/quality/80/louis-de-funes.jpeg"
            navigation={navigation}

          />
          <Publication
            auteur="Adrien"
            utilisateurId="2"
            titre="Concert de Johnny Hallyday"
            categorie="Loisirs"
            lieuActivite="Dijon"
            dateActivite={new Date(2023, 0, 28, 15, 10, 30)}
            codePostalActivite="21000"
            contenu=""
            dateCreation={new Date(2023, 0, 7, 15, 10, 30)}
            typePieceJointe='ACTIVITE'
            status={StatusPublicationEnum.ENATTENTE}
            raisonRefus={undefined}
            lienImage="https://fr.web.img3.acsta.net/r_654_368/newsv7/21/04/29/14/22/0010719.jpg"
            navigation={navigation}
          />

          <Publication
            auteur="Adrien"
            utilisateurId="2"
            idPieceJointe="3"
            titre="L'art abstrait"
            categorie="Intelligence émotionnelle"
            contenu="L'art abstrait est un art qui ne représente pas la réalité, mais qui cherche à exprimer des émotions, des sensations, des idées, des états d'âme, des sentiments, des souvenirs, des rêves et des pensées."
            status={StatusPublicationEnum.ENATTENTE}
            raisonRefus={undefined}
            dateCreation={new Date(2023, 0, 28, 15, 10, 30)}
            typePieceJointe='IMAGE'
            lienImage="https://voi.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fprismamedia_people.2F2017.2F06.2F30.2F598687b0-716f-4a58-9d64-1d07df43565b.2Ejpeg/2048x1536/quality/80/louis-de-funes.jpeg"
            navigation={navigation}
          />
        </ScrollView>
      </GestureHandlerRootView>
    </Box>
  );
}
function CustomButton({ isAuthenticated, onPress }: { isAuthenticated: boolean; onPress: () => void }) {
  // Show button only if user is logged in
  if (isAuthenticated) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.customButton}>
        <Ionicons name="add-outline" size={36} color="#FFFFFF" />
      </TouchableOpacity>
    );
  }
  return null;
}

const StackNav = createStackNavigator();

const withPaperProvider = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    return (
      <PaperProvider>
        <WrappedComponent {...props} />
      </PaperProvider>
    );
  };
};

const WrappedCreationRessourceScreen = withPaperProvider(
  CreationRessourceScreen
);

const ListePublicationStack = () => {
  return (
    <StackNav.Navigator initialRouteName="ListePublicationsScreen">
      <StackNav.Screen
        name="ListePublicationsScreen"
        component={ListePublicationsScreen}
        options={{ headerShown: false }}
      />
      <StackNav.Screen
        name="CreationRessourceScreen"
        component={WrappedCreationRessourceScreen}
      />
      <StackNav.Screen name="AjouterPJScreen" component={AjouterPJScreen} />
    </StackNav.Navigator>
  );
};
export default ListePublicationStack;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#BBBBBB",
    marginTop: 35,
    height: "96%",
  },
  scrollView: {
    paddingTop: 60,
  },
  vendorHeader: {
    backgroundColor: "#FFFFFF",
    height: 60,
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontFamily: "Sansita-Swashed-SemiBold",
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
  customButton: {
    position: "absolute",
    right: 5,
    bottom: 16,
    backgroundColor: "#4183F4",
    borderRadius: 50,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  buttonText: {
    fontSize: 36,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});
