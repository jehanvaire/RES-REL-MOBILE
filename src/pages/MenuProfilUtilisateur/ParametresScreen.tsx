import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";

const ParametresScreen = () => {

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Paramètres',
    });
  }, [navigation]);

  return (
    <View>
      <TouchableOpacity style={styles.parameterItem}>
        <Ionicons name={"alert-circle-outline"} size={30} />
        <Text style={styles.parameterText}>Signaler un problème</Text>
        <Ionicons name={"chevron-forward-outline"} size={30} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.parameterItem}>
        <Ionicons name={"help-buoy-outline"} size={30} />
        <Text style={styles.parameterText}>Aide</Text>
        <Ionicons name={"chevron-forward-outline"} size={30} />
      </TouchableOpacity>
      <TouchableOpacity 
      //TODO Fix warning
      onPress={() =>
        navigation.navigate('AboutScreen')
      } 
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
  parameterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  parameterText: {
    position: 'absolute',
    left: 40,
    fontSize: 16,
  },
});