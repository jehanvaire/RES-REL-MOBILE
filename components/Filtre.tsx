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
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import { BehaviorSubject } from "rxjs";

function Filtre() {
  const initialFocusRef = React.useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // valeurs du formulaire
  const [dateDebut, setDateDebut] = useState(new Date());
  const [dateFin, setDateFin] = useState(new Date());
  const [categorie, setCategorie] = useState("Toutes les catégories");

  function onChange(selectedDate: any) {
    const currentDate = selectedDate;
    setDateDebut(currentDate);
  }

  function onDateFinChange(selectedDate: Date) {
    // set dateFin to a clone of selectedDate
    setDateFin(selectedDate);
  }

  React.useEffect(() => {
    dateDebut.setHours(0, 0, 0, 0);
    dateFin.setHours(23, 59, 59, 999);
  }, [dateDebut, dateFin]);

  function datePicker(choixDate: number): void {
    DateTimePickerAndroid.open({
      value: new Date(),
      // onChange: () => {
      //   console.log("onChange");
      //   // choixDate === 0 ? onDateDebutChange : onDateFinChange;
      //   onDateDebutChange
      // },
      onChange,
      mode: "date",
      is24Hour: true,
    });
  }
  // TODO: changer popoover en modal
  // TODO: ajouter les filtres sort by et order by
  return (
    <View style={styles.Modal}>
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
            <FormControl>
              <Button onPress={() => datePicker(0)}>
                <Text>Date début</Text>
              </Button>
              <Center>
                <Text>
                  {dateDebut.toDateString()} {dateDebut.toTimeString()}
                </Text>
              </Center>
            </FormControl>

            <FormControl>
              <Button onPress={() => datePicker(1)}>
                <Text>Date fin</Text>
              </Button>
              <Center>
                <Text>
                  {dateDebut.toDateString()} {dateDebut.toTimeString()}
                </Text>
              </Center>
            </FormControl>

            <FormControl mt="3">
              <FormControl.Label
                _text={{
                  fontSize: "xs",
                  fontWeight: "medium",
                }}
              >
                Last Name
              </FormControl.Label>
              <Input rounded="sm" fontSize="xs" />
            </FormControl>
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
  Modal: {
    // marginTop: 50,
  },
  searchIcon: {
    color: "black",
    marginTop: 5,
    marginRight: 10,
  },
});
