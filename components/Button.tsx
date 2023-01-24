import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

export default function Button() {
  return (
    <Pressable style={styles.pressable} onPress={onPressFunction}>
      <View>Click me</View>
    </Pressable>
  );
}

function onPressFunction() {
  console.log("Button pressed");
}

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: "red",
    width: 100,
    height: 100,
  },
});
