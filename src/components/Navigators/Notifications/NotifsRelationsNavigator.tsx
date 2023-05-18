import { createStackNavigator } from "@react-navigation/stack";
import PdfView from "../../../pages/PdfView";
import NotificationsRelationsScreen from "../../../pages/Notifications/NotificationsRelationsScreen";
import ProfilScreen from "../../../pages/ProfilScreen";

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
        component={NotificationsRelationsScreen}
        options={{ headerShown: false }}
      />
      <StackNav.Screen
        name="DetailUtilisateurRelations"
        component={ProfilScreen}
        options={{ headerShown: false, title: "" }}
      />
      <StackNav.Screen name="PdfView" component={PdfView} />
    </StackNav.Navigator>
  );
};

export default NotifsRelationsNavigator;
