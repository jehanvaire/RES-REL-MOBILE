import { createStackNavigator } from "@react-navigation/stack";
import RechercheRessourceScreen from "../../../pages/Rercherche/RechercheRessourceScreen";
import DetailsPublication from "../../Publication/DetailsPublication";
import EspaceCommentaireScreen from "../../../pages/Publication/EspaceCommentaireScreen";

const StackNav = createStackNavigator();

const RessourceStackNavigator = () => {
  return (
    <StackNav.Navigator
      initialRouteName="RechercheScreen"
      screenOptions={{
        headerShown: false,
        headerStyle: { display: "none" },
      }}
    >
      <StackNav.Screen
        name="RechercheScreen"
        component={RechercheRessourceScreen}
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
    </StackNav.Navigator>
  );
};

export default RessourceStackNavigator;
