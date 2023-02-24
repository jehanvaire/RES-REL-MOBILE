import { Center, Spacer, Stack } from "native-base";
import React, { useEffect, useState } from "react";

import { StyleSheet, TouchableOpacity, Text, TextInput } from "react-native";
import { View } from "native-base";
import { Utilisateur } from "../ressources/types/Utilisateur";
import { AuthentificationEnum } from "../ressources/enums/AuthentificationEnum";
import { storage } from "../services/AuthentificationService";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ListePublicationsScreen(props: any) {
  const [utilisateur, setUtilisateur] = useState<Utilisateur>(
    {} as Utilisateur
  );
  const [searchValue, setSeachValue] = React.useState("");

  const onSearchValueChange = (value: string) => {
    console.log(value);
    setSeachValue(value);
  };

  useEffect(() => {
    var user_json = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";

    var user = JSON.parse(user_json) as Utilisateur;
    setUtilisateur(user);
  }, []);
  return (
    <View style={styles.container}>
      <Center style={styles.searchStack}>
        <Stack direction="row">
          <TextInput
            style={styles.textInput}
            onChangeText={onSearchValueChange}
            value={searchValue}
            placeholder="Rechercher une ressource"
          />
          <TouchableOpacity>
            <Ionicons
              name="search-outline"
              size={25}
              style={[styles.searchIcon]}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="options-outline"
              size={25}
              style={[styles.searchIcon]}
            />
          </TouchableOpacity>
        </Stack>
      </Center>

      <Spacer />

      <Text>{searchValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  searchStack: {
    backgroundColor: "white",
    height: 50,
    width: "100%",
  },
  textInput: {
    height: 40,
    paddingLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    width: "75%",
    borderColor: "gray",
    borderWidth: 1,
  },
  searchIcon: {
    color: "black",
    marginTop: 5,
    marginRight: 10,
  },
});
