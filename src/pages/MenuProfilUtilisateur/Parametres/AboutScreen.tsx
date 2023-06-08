import { useNavigation } from "@react-navigation/native";
import { Stack, Switch } from "native-base";
import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet} from "react-native";
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
    <>
    
    
    <View style={styles.container}>
      <View style={styles.parameterItem}>
        <Text style={styles.parameterText}>Version</Text>
        <Text style={styles.parameterText}>1.0.0</Text>
      </View>
      <View style={styles.parameterItem}>
        <Text style={styles.parameterText}>Développement by VASP</Text>
        <Text style={styles.parameterText}>Tous droits réservés</Text>
      </View>
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

export default AboutScreen;

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