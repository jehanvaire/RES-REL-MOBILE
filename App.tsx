import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Button from "./components/Button";
import Screen from "./components/Screen";

export default function App() {
  return (
    <View style={styles.container}>
      <Screen></Screen>
      <Button></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
