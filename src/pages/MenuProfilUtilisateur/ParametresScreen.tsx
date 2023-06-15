import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";

const ParametresScreen = (props: any) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Paramètres",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.parameterItem}>
        <Ionicons name={"alert-circle-outline"} size={30} />
        <Text style={styles.parameterText}>Signaler un problème</Text>
        <Ionicons name={"chevron-forward-outline"} size={30} />
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.parameterItem}>
        <Ionicons name={"help-buoy-outline"} size={30} />
        <Text style={styles.parameterText}>Aide</Text>
        <Ionicons name={"chevron-forward-outline"} size={30} />
      </TouchableOpacity> */}

      <TouchableOpacity
        onPress={() => props.navigation.navigate("AboutScreen")}
        style={styles.parameterItem}
      >
        <Ionicons name={"information-circle-outline"} size={30} />
        <Text style={styles.parameterText}>A propos</Text>
        <Ionicons name={"chevron-forward-outline"} size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default ParametresScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  parameterItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  parameterText: {
    position: "absolute",
    left: 40,
    fontSize: 16,
  },
});
