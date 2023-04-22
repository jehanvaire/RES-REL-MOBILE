import { View, Text, StyleSheet } from "react-native";

const FooterAuthentification = () => {
  return (
    <View style={styles.footer}>
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
});
