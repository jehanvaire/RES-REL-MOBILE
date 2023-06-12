import { createStackNavigator } from "@react-navigation/stack";
import RechercheUtilisateurScreen from "../../../pages/Rercherche/RechercheUtilisateurScreen";
import ProfilScreen from "../../../pages/ProfilScreen";

const StackNav = createStackNavigator();

const GestionUtilisateursBannisNavigator = () => {
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
        name="DetailsAutreUtilisateur"
        component={ProfilScreen}
        options={{ headerShown: false, title: "" }}
        initialParams={{ autreUtilisateur: true }}
      />
    </StackNav.Navigator>
  );
};

export default GestionUtilisateursBannisNavigator;
