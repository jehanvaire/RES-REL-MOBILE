import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Screen() {
  return (
    <View>
      <Text style={styles.container}>Bonjour</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    color: "red",
  },
});
