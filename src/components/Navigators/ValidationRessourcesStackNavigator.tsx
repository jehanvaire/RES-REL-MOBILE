import { createStackNavigator } from "@react-navigation/stack";
import DetailsPublication from "../Publication/DetailsPublication";
import ValidationRessourcesScreen from "../../pages/ValidationPublicationScreen";

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
    </StackNav.Navigator>
  );
};

export default ValidationRessourcesStackNavigator;
