import React from "react";
import { NativeBaseProvider } from "native-base";
import { AuthContainer } from "./services/AuthentificationService";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import Connexion from "./pages/ConnexionScreen";
import Menu from "./pages/Menu";
import { Dimensions } from "react-native";

var width = Dimensions.get("window").width; //full width

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
    // takes all the space available
    flex: 1,
    width: width,

    // aligns the children in the center of the main axis (here, vertical)
    justifyContent: "center",

    // aligns the children in the center of the cross axis (here, horizontal)
    alignItems: "center",

    // sets the background color to white
    backgroundColor: "white",

    // centers the children
    textAlign: "center",

    // adds a default font size
    fontSize: 16,

    // adds a default font weight
    fontWeight: "normal",

    // adds a default color
    color: "black",
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
