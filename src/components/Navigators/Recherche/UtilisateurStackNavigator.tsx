import { createStackNavigator } from "@react-navigation/stack";
import RechercheUtilisateurScreen from "../../../pages/Rercherche/RechercheUtilisateurScreen";
import DetailsUtilisateur from "../../Publication/DetailsUtilisateur";

const StackNav = createStackNavigator();

const UtilisateurStackNavigator = () => {
  return (
    <StackNav.Navigator initialRouteName="ListeUtilisateurs">
      <StackNav.Screen
        name="ListeUtilisateurs"
        component={RechercheUtilisateurScreen}
        options={{ headerShown: false }}
      />
      <StackNav.Screen
        name="DetailsUtilisateur"
        component={DetailsUtilisateur}
        options={{ headerShown: false, title: "" }}
      />
    </StackNav.Navigator>
  );
};

export default UtilisateurStackNavigator;
