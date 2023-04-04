import { Modal, Select, Button, FormControl } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { TouchableOpacity, StyleSheet, View, Platform } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import CategorieService from "../services/CategorieService";
import FiltreService from "../services/FiltreService";

function Filtre() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([] as CategorieEntity[]);

  const [dateDebutPicker, setDateDebutPicker] = useState(false);
  const [dateFinPicker, setDateFinPicker] = useState(false);

  const [dateDebut, setDateDebut] = useState(new Date("1990-01-01"));
  const [dateFin, setDateFin] = useState(new Date());
  const [selectedCategorie, setSelectedCategorie] = useState({
    id: 0,
    nom: "Toutes les catégories",
  } as CategorieEntity);

  function showDateDebutPicker() {
    setDateDebutPicker(true);
  }

  function showDateFinPicker() {
    setDateFinPicker(true);
  }

  function onDateDebutSelected(event: any, value: any) {
    if (value > dateFin) {
      setDateDebut(dateFin);
    } else {
      setDateDebut(value);
    }
    setDateDebutPicker(false);
  }

  function onDateFinSelected(event: any, value: any) {
    if (value < dateDebut) {
      setDateFin(dateDebut);
    } else {
      setDateFin(value);
    }
    setDateFinPicker(false);
  }

  function onCancel() {
    setIsOpen(false);
    setDateDebut(new Date("1990-01-01"));
    setDateFin(new Date());
    setSelectedCategorie({} as CategorieEntity);
  }

  function onSave() {
    setIsOpen(false);
    const filtres = {
      dateDebut: dateDebut,
      dateFin: dateFin,
      categorie: selectedCategorie.id,
    } as FiltreEntity;
    FiltreService.setFiltres(filtres);
  }

  React.useEffect(() => {
    dateDebut.setHours(0, 0, 0, 0);
    dateFin.setHours(23, 59, 59, 999);

    CategorieService.GetAllCategories().then((categories: any) => {
      setCategories(categories);
    });
  }, [dateDebut, dateFin]);

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
                  {dateDebut.toLocaleDateString()}
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
                  {dateFin.toLocaleDateString()}
                </Button>
              </View>
            )}
            <FormControl>
              <FormControl.Label>Catégorie</FormControl.Label>
              <Select
                selectedValue={selectedCategorie.nom}
                minWidth={200}
                accessibilityLabel="Sélectionnez une catégorie"
                placeholder="Sélectionnez une catégorie"
                onValueChange={(itemValue) => {
                  const catSelectionnee: any = categories.find(
                    (c) => c.nom === itemValue
                  );
                  setSelectedCategorie(catSelectionnee);
                }}
                defaultValue=""
                _selectedItem={{
                  bg: "teal.600",
                }}
              >
                <Select.Item key="0" label="Toutes les catégorie" value="0" />
                {categories.map((categorie: any) => (
                  <Select.Item
                    key={categorie.id}
                    label={categorie.nom}
                    value={categorie.nom}
                  />
                ))}
              </Select>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group>
              <Button colorScheme="coolGray" variant="ghost" onPress={onCancel}>
                Cancel
              </Button>
              <Button onPress={onSave}>Save</Button>
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
