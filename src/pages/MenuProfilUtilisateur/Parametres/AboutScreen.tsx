import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";


const AboutScreen = () => {

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'A propos',
    });
  }, [navigation]);


  return (
    <View>
      <View style={styles.parameterItem}>
        <Text style={styles.parameterText}>Version</Text>
        <Text style={styles.parameterText}>1.0.0</Text>
      </View>
      <View style={styles.parameterItem}>
        <Text style={styles.parameterText}>Conditions générales d'utilisation</Text>
        <Ionicons name={"chevron-forward-outline"} size={30} />
      </View>
      <View style={styles.parameterItem}>
        <Text style={styles.parameterText}>Politique de confidentialité</Text>
        <Ionicons name={"chevron-forward-outline"} size={30} />
      </View>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  parameterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  parameterText: {
    fontSize: 16,
  },
});