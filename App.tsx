import React from "react";
import { NativeBaseProvider } from "native-base";
import { AuthContainer } from "./services/AuthentificationService";
import Authentification from "./pages/Authentification/AuthentificationMenuScreen";
import Menu from "./pages/Menu";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Connexion from "./pages/Authentification/ConnexionScreen";
import CreationCompte from "./pages/Authentification/CreationCompteScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <AuthContainer>
          {({ authenticated }: any) => {
            return authenticated ? (
              <Menu />
            ) : (
              <Stack.Navigator initialRouteName="Authentification">
                <Stack.Screen
                  name="Authentification"
                  component={Authentification}
                  options={{ header: () => null }}
                />
                <Stack.Screen
                  name="Connexion"
                  component={Connexion}
                  options={{ header: () => null }}
                />
                <Stack.Screen
                  name="CreationCompte"
                  component={CreationCompte}
                  options={{ header: () => null }}
                />
              </Stack.Navigator>
            );
          }}
        </AuthContainer>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

export default App;
