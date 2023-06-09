import React, { createContext, useState } from "react";
import { NativeBaseProvider, StatusBar } from "native-base";
import { AuthContainer } from "./src/services/AuthentificationService";
import Authentification from "./src/pages/Authentification/AuthentificationMenuScreen";
import Menu from "./src/pages/Menu";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Connexion from "./src/pages/Authentification/ConnexionScreen";
import CreationCompte from "./src/pages/Authentification/CreationCompteScreen";
import { lightTheme, darkTheme, mapNativeBaseToReactNavigationTheme } from './src/ressources/styles/themes';
import ThemeContext from './src/pages/MenuProfilUtilisateur/Parametres/ThemeContext';


const Stack = createStackNavigator();
require("moment/locale/fr.js");

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <>
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        <StatusBar barStyle="dark-content" hidden={false} translucent={true} />
        <NavigationContainer theme={mapNativeBaseToReactNavigationTheme(isDarkMode ? darkTheme : lightTheme)}>
          <NativeBaseProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <AuthContainer>
              {({ authenticated }: any) => {
                return authenticated ? (
                  <Menu />
                ) : (
                  <Stack.Navigator initialRouteName="Authentification">
                    <Stack.Screen
                      name="Authentification"
                      component={Authentification}
                      options={{
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="Connexion"
                      component={Connexion}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="CreationCompte"
                      component={CreationCompte}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="ModeInvite"
                      component={Menu}
                      options={{ headerShown: false }}
                    />
                  </Stack.Navigator>
                );
              }}
            </AuthContainer>
          </NativeBaseProvider>
        </NavigationContainer>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
