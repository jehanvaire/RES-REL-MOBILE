import { createStackNavigator } from "@react-navigation/stack";
import RechercheRessourceScreen from "../../../pages/Rercherche/RechercheRessourceScreen";
import DetailsPublication from "../../Ressource/DetailsPublication";
import PdfView from "../../../pages/PdfView";

const StackNav = createStackNavigator();

const NotifsRelationsNavigator = () => {
  return (
    <StackNav.Navigator
      initialRouteName="NotificationsRelationsScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackNav.Screen
        name="NotificationsRelationsScreen"
        component={RechercheRessourceScreen}
        options={{ headerShown: false }}
      />
      <StackNav.Screen
        name="DetailsPublication"
        component={DetailsPublication}
        options={{ headerShown: false, title: "" }}
      />
      <StackNav.Screen name="PdfView" component={PdfView} />
    </StackNav.Navigator>
  );
};

export default NotifsRelationsNavigator;
