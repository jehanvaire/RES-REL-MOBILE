import {
  Box,
  VStack,
  Modal,
  Select,
  CheckIcon,
  Button,
  FormControl,
  Input,
  Center,
} from "native-base";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import { BehaviorSubject } from "rxjs";

function Filtre() {
  const initialFocusRef = React.useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const [dateDebutPicker, setDateDebutPicker] = useState(false);
  const [dateFinPicker, setDateFinPicker] = useState(false);
  const [timePicker, setTimePicker] = useState(false);

  const [dateDebut, setDateDebut] = useState(new Date());

  const [dateFin, setDateFin] = useState(new Date());

  function showDateDebutPicker() {
    setDateDebutPicker(true);
  }

  function showDateFinPicker() {
    setDateFinPicker(true);
  }

  function onDateDebutSelected(event: any, value: any) {
    setDateDebut(value);
    setDateDebutPicker(false);
  }

  function onDateFinSelected(event: any, value: any) {
    setDateFin(value);
    setDateFinPicker(false);
  }

  const [categorie, setCategorie] = useState("Toutes les catégories");

  React.useEffect(() => {
    dateDebut.setHours(0, 0, 0, 0);
    dateFin.setHours(23, 59, 59, 999);
  }, [dateDebut, dateFin]);

  // TODO: changer popoover en modal
  // TODO: ajouter les filtres sort by et order by
  return (
    <View>
      <TouchableOpacity onPress={() => setIsOpen(true)}>
        <Ionicons
          name="options-outline"
          size={25}
          style={[styles.searchIcon]}
        />
      </TouchableOpacity>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
        <Modal.Content width="56">
          <Modal.CloseButton />
          <Modal.Header>Filtres ressources</Modal.Header>
          <Modal.Body>
            <Text style={styles.text}>Date = {dateDebut.toDateString()}</Text>
            <Text style={styles.text}>Date = {dateFin.toDateString()}</Text>

            {dateDebutPicker ? (
              <DateTimePicker
                value={dateDebut}
                mode={"date"}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                is24Hour={true}
                onChange={onDateDebutSelected}
                style={styles.datePicker}
              />
            ) : (
              <View style={{ margin: 10 }}>
                <Button color="green" onPress={showDateDebutPicker}>
                  Date début
                </Button>
              </View>
            )}

            {dateFinPicker ? (
              <DateTimePicker
                value={dateFin}
                mode={"date"}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                is24Hour={true}
                onChange={onDateFinSelected}
                style={styles.datePicker}
              />
            ) : (
              <View style={{ margin: 10 }}>
                <Button color="green" onPress={showDateFinPicker}>
                  Date fin
                </Button>
              </View>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button.Group>
              <Button colorScheme="coolGray" variant="ghost">
                Cancel
              </Button>
              <Button>Save</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
}

export default Filtre;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    padding: 6,
    alignItems: "center",
    backgroundColor: "white",
  },

  text: {
    fontSize: 15,
    padding: 3,
    marginBottom: 10,
    textAlign: "center",
  },

  // Style for iOS ONLY...
  datePicker: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: 320,
    height: 260,
    display: "flex",
  },
  searchIcon: {
    color: "black",
    marginTop: 5,
    marginRight: 10,
  },
});
