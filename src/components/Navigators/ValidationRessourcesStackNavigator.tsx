import { createStackNavigator } from "@react-navigation/stack";
import DetailsPublication from "../Ressource/DetailsPublication";
import ValidationRessourcesScreen from "../../pages/ValidationPublicationScreen";
import EspaceCommentaireScreen from "../../pages/Publication/EspaceCommentaireScreen";

const StackNav = createStackNavigator();

const ValidationRessourcesStackNavigator = () => {
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
      <StackNav.Screen
        name="EspaceCommentaireScreen"
        component={EspaceCommentaireScreen}
        options={{ headerShown: true, title: "" }}
      />
    </StackNav.Navigator>
  );
};

export default ValidationRessourcesStackNavigator;
