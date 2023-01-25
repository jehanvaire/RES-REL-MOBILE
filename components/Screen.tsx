import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Screen() {
  return (
    <View>
      <Text style={styles.container}>Test</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    color: "red",
  },
});
