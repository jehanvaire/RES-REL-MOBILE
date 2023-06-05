import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { View, Text, StyleSheet, Appearance } from "react-native";
import { Switch } from "native-base";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";

const ThemeScreen = () => {

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Apparence',
    });
  }, [navigation]);

  //use darktheme and lighttheme


  return (
    <>
      <View style={styles.container}>
         
        <View style={styles.parameterItem}>
          <Text style={styles.parameterText}>Thème sombre</Text>
          <Switch/>
        </View>
        {/*<View style={styles.parameterItem}>
          <Text style={styles.parameterText}>Développement by VASP</Text>
          <Text style={styles.parameterText}>Tous droits réservés</Text>
        </View> */}
      {/* <View style={styles.parameterItem}>
        <Text style={styles.parameterText}>Conditions générales d'utilisation</Text>
        <Ionicons name={"chevron-forward-outline"} size={30} />
      </View> */}
      {/* <View style={styles.parameterItem}>
        <Text style={styles.parameterText}>Politique de confidentialité</Text>
        <Ionicons name={"chevron-forward-outline"} size={30} />
        </View> */}
      </View>
    </>
  );
};

export default ThemeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  parameterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  parameterText: {
    fontSize: 16,
  },
});