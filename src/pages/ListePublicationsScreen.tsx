import { Box, ScrollView, View, Image } from "native-base";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Publication from "../components/Ressource/Publication";
import { StatusPublicationEnum } from "../ressources/enums/StatusPublicationEnum";
import CreationPublicationScreen from "../components/Ressource/CreationPublicationScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import AjouterPJScreen from "../components/Ressource/AjouterPJScreen";
import { Provider as PaperProvider } from "react-native-paper";
import images from "../ressources/ListeImagesLocales";

const HeaderComponent = () => {
  return (
    <View style={[styles.vendorHeader, styles.shadow]}>
      <Image source={images.logo} alt="icon" style={styles.logo} />
      {/* TODO Font Santisa Swached sur le texte */}
      <Text style={styles.headerText}>Ressources Relationnelles</Text>
    </View>
  );
};

function ListePublicationsScreen({ navigation }: any) {
  const navigateToCreation = () => {
    navigation.navigate("CreationPublicationScreen");
  };
  return (
    <Box style={styles.container}>
      <CustomButton onPress={navigateToCreation} />
      <HeaderComponent />
      <GestureHandlerRootView>
        <ScrollView style={styles.scrollView}>
          <Publication
            auteur="Adrien"
            titre="Mémoires de Louis de Funès"
            contenu="Louis de Funès, de son nom complet Louis de Funès de Galarza, est un acteur français né le 31 juillet 1914 à Courbevoie et mort le 27 janvier 1983 à Nantes.
        Ayant joué dans près de cent cinquante films, il est l'un des acteurs comiques les plus célèbres du cinéma français de la seconde moitié du xxe siècle et réalise les meilleurs résultats du cinéma français, des années 1960 au début des années 1980. Il réalise également les meilleures audiences télévisées. Très peu récompensé, il reçoit toutefois un César d'honneur pour l'ensemble de sa carrière en 1980.
        Après presque vingt ans sur les planches ainsi que devant les caméras dans de nombreux seconds rôles, il impose son personnage de Français moyen impulsif, râleur, au franc-parler parfois dévastateur, aux verbigérations et mimiques parfois muettes. C'est dans les années 1950 qu'il se fait connaître tardivement du public avec La Traversée de Paris (1956), ses premiers rôles principaux et le triomphe au théâtre d'Oscar. Dans les deux décennies qui suivent, on le retrouve dans une suite de succès populaires, parmi lesquels : Pouic-Pouic (1963), Le Gendarme de Saint-Tropez (1964) et ses cinq suites, la trilogie Fantomas (1964 à 1967), Le Corniaud (1965), Le Grand Restaurant et La Grande Vadrouille (1966), Oscar et Les Grandes Vacances (1967), Le Petit Baigneur (1968), Hibernatus (1969), Jo et La Folie des grandeurs (1971), Les Aventures de Rabbi Jacob (1973), L'Aile ou la Cuisse (1976), La Zizanie (1978) et La Soupe aux choux (1981). Il a également participé à l'écriture de quelques scénarios de ses films et signé la réalisation de L'Avare avec Jean Girault en 1980."
            status={StatusPublicationEnum.ENATTENTE}
            raisonRefus={undefined}
            dateCreation={new Date(2023, 0, 28, 15, 10, 30)}
            lienImage="https://voi.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fprismamedia_people.2F2017.2F06.2F30.2F598687b0-716f-4a58-9d64-1d07df43565b.2Ejpeg/2048x1536/quality/80/louis-de-funes.jpeg"
            navigation={navigation}
          />

          <Publication
            auteur="Adrien"
            titre="Sortie au cinéma"
            contenu="Le film sortira au cinéma le 28 janvier 2023."
            dateCreation={new Date(2023, 0, 7, 15, 10, 30)}
            status={StatusPublicationEnum.ENATTENTE}
            raisonRefus={undefined}
            lienImage="https://fr.web.img3.acsta.net/r_654_368/newsv7/21/04/29/14/22/0010719.jpg"
            navigation={navigation}
          />

          <Publication
            auteur="Adrien"
            titre="Mémoires de Louis de Funès"
            contenu="Louis de Funès, de son nom complet Louis de Funès de Galarza, est un acteur français né le 31 juillet 1914 à Courbevoie et mort le 27 janvier 1983 à Nantes.
        Ayant joué dans près de cent cinquante films, il est l'un des acteurs comiques les plus célèbres du cinéma français de la seconde moitié du xxe siècle et réalise les meilleurs résultats du cinéma français, des années 1960 au début des années 1980. Il réalise également les meilleures audiences télévisées. Très peu récompensé, il reçoit toutefois un César d'honneur pour l'ensemble de sa carrière en 1980.
        Après presque vingt ans sur les planches ainsi que devant les caméras dans de nombreux seconds rôles, il impose son personnage de Français moyen impulsif, râleur, au franc-parler parfois dévastateur, aux verbigérations et mimiques parfois muettes. C'est dans les années 1950 qu'il se fait connaître tardivement du public avec La Traversée de Paris (1956), ses premiers rôles principaux et le triomphe au théâtre d'Oscar. Dans les deux décennies qui suivent, on le retrouve dans une suite de succès populaires, parmi lesquels : Pouic-Pouic (1963), Le Gendarme de Saint-Tropez (1964) et ses cinq suites, la trilogie Fantomas (1964 à 1967), Le Corniaud (1965), Le Grand Restaurant et La Grande Vadrouille (1966), Oscar et Les Grandes Vacances (1967), Le Petit Baigneur (1968), Hibernatus (1969), Jo et La Folie des grandeurs (1971), Les Aventures de Rabbi Jacob (1973), L'Aile ou la Cuisse (1976), La Zizanie (1978) et La Soupe aux choux (1981). Il a également participé à l'écriture de quelques scénarios de ses films et signé la réalisation de L'Avare avec Jean Girault en 1980."
            status={StatusPublicationEnum.ENATTENTE}
            raisonRefus={undefined}
            dateCreation={new Date(2023, 0, 28, 15, 10, 30)}
            lienImage="https://voi.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fprismamedia_people.2F2017.2F06.2F30.2F598687b0-716f-4a58-9d64-1d07df43565b.2Ejpeg/2048x1536/quality/80/louis-de-funes.jpeg"
            navigation={navigation}
          />
        </ScrollView>
      </GestureHandlerRootView>
    </Box>
  );
}
function CustomButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.customButton}>
      <Ionicons name="add-outline" size={36} color="#FFFFFF" />
    </TouchableOpacity>
  );
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

const WrappedCreationPublicationScreen = withPaperProvider(
  CreationPublicationScreen
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
        name="CreationPublicationScreen"
        component={WrappedCreationPublicationScreen}
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
    fontFamily: "SansitaSwashed-Bold",
    color: "#000000",
    fontWeight: "bold",
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
    right: 16,
    bottom: 16,
    backgroundColor: "#6200EE",
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