import { createStackNavigator } from "@react-navigation/stack";
import RechercheRessourceScreen from "../../../pages/Rercherche/RechercheRessourceScreen";
import DetailsPublication from "../../Publication/DetailsPublication";

const StackNav = createStackNavigator();

const RessourceStackNavigator = () => {
  return (
    <StackNav.Navigator initialRouteName="RechercheScreen">
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
    </StackNav.Navigator>
  );
};

export default RessourceStackNavigator;
