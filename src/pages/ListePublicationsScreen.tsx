import { Box, ScrollView, View, Image } from "native-base";
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Publication from "../components/Ressource/Publication";
import { StatusPublicationEnum } from "../ressources/enums/StatusPublicationEnum";
import CreationRessourceScreen from "../components/Ressource/CreationRessourceScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Provider as PaperProvider } from "react-native-paper";
import images from "../ressources/ListeImagesLocales";
//importe mode invité de AuthentificationMenuScreen
import { AuthentificationEnum } from "../ressources/enums/AuthentificationEnum";
import { storage } from "../services/AuthentificationService";
import { SafeAreaView } from "react-native-safe-area-context";
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
    const user_json =
      storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";
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

  return (
    <>
      <SafeAreaView>
        <HeaderComponent />
      </SafeAreaView>
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />

        <CustomButton
          isAuthenticated={isAuthenticated}
          onPress={navigateToCreation}
        />
        <GestureHandlerRootView>
          <ScrollView>
            <Publication
              id="1"
              utilisateurId="2"
              idPieceJointe="2"
              auteur="Adrien"
              titre="Mais quel drip indécent !"
              categorie="Culture"
              contenu="Le Pape francois est doté d'un style vestimentaire unique. En effet Gucci a décidé de lui offrir un ensemble de vêtements d'une valeur de 1 000 000 de dollars, pièce unique au monde."
              status={StatusPublicationEnum.ENATTENTE}
              typePieceJointe="IMAGE"
              raisonRefus={undefined}
              dateCreation={new Date(2023, 0, 28, 15, 10, 30)}
              navigation={navigation}
            />
            <Publication
              auteur="Adrien"
              utilisateurId="2"
              idPieceJointe="2"
              titre="Sortie au cinéma"
              categorie="Loisirs"
              contenu="Le film sortira au cinéma le 28 janvier 2023."
              dateCreation={new Date(2023, 0, 7, 15, 10, 30)}
              typePieceJointe="IMAGE"
              status={StatusPublicationEnum.ENATTENTE}
              raisonRefus={undefined}
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
              typePieceJointe="IMAGE"
              navigation={navigation}
            />
          </ScrollView>
        </GestureHandlerRootView>
      </View>
    </>
  );
}
function CustomButton({
  isAuthenticated,
  onPress,
}: {
  isAuthenticated: boolean;
  onPress: () => void;
}) {
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
    alignItems: "center",
    zIndex: 1000,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    // fontFamily: "SansitaSwashed-Bold",
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
});
