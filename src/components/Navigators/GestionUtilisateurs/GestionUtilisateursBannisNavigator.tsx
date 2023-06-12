import { createStackNavigator } from "@react-navigation/stack";
import ProfilScreen from "../../../pages/ProfilScreen";
import GestionComptesBannisScreen from "../../../pages/GestionComptesUtilisateurs/GestionComptesBannisScreen";

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
        component={GestionComptesBannisScreen}
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
