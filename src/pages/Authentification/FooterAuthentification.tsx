import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";

const FooterAuthentification = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={[styles.footer, isKeyboardVisible ? styles.hidden : null]}>
      <Text style={{ color: "whitesmoke" }}>
        (Re)ssources Relationnelles © 2023
      </Text>
    </View>
  );
};

export default FooterAuthentification;

const styles = StyleSheet.create({
  footer: {
    marginTop: "auto",
    width: "100%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  hidden: {
    display: "none",
  },
});
