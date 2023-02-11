import React from "react";
import { NativeBaseProvider } from "native-base";
import { AuthContainer } from "./services/AuthentificationService";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import Connexion from "./pages/ConnexionScreen";
import Menu from "./pages/Menu";

function App() {
  return (
    <SafeAreaView style={styles.view}>
      <NativeBaseProvider>
        <AuthContainer>
          {({ authenticated }: any) => {
            return authenticated ? <Menu /> : <Connexion />;
          }}
        </AuthContainer>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  button: {
    backgroundColor: "gray",
    height: 50,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    margin: 50,
  },
});

export default App;
