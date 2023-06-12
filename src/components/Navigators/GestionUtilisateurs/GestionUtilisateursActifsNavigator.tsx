import { createStackNavigator } from "@react-navigation/stack";
import DetailsPublication from "../../Ressource/DetailsPublication";
import EspaceCommentaireScreen from "../../../pages/Publication/EspaceCommentaireScreen";
import PdfView from "../../../pages/PdfView";
import GestionComptesActifsScreen from "../../../pages/GestionComptesUtilisateurs/GestionComptesActifsScreen";

const StackNav = createStackNavigator();

const GestionUtilisateursActifsNavigator = () => {
  return (
    <StackNav.Navigator
      initialRouteName="GestionUtilisateursActifsScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackNav.Screen
        name="GestionUtilisateursActifsScreen"
        component={GestionComptesActifsScreen}
        options={{ headerShown: false }}
      />
      <StackNav.Screen
        name="DetailsPublication"
        component={DetailsPublication}
        options={{ headerShown: false, title: "" }}
      />
      <StackNav.Screen
        name="EspaceCommentaireScreen"
        component={EspaceCommentaireScreen}
        options={{ headerShown: false, title: "" }}
      />
      <StackNav.Screen name="PdfView" component={PdfView} />
    </StackNav.Navigator>
  );
};

export default GestionUtilisateursActifsNavigator;
