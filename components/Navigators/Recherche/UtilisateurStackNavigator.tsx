import { createStackNavigator } from "@react-navigation/stack";
import RechercheUtilisateurScreen from "../../../pages/Rercherche/RechercheUtilisateurScreen";
import ProfilScreen from "../../../pages/ProfilScreen";

const StackNav = createStackNavigator();

const UtilisateurStackNavigator = () => {
  return (
    <StackNav.Navigator
      initialRouteName="ListeUtilisateurs"
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackNav.Screen
        name="ListeUtilisateurs"
        component={RechercheUtilisateurScreen}
        options={{ headerShown: false }}
      />
      <StackNav.Screen
        name="DetailsUtilisateur"
        component={ProfilScreen}
        options={{ headerShown: true, title: "" }}
      />
    </StackNav.Navigator>
  );
};

export default UtilisateurStackNavigator;
