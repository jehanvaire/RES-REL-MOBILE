import {
  Box,
  Center,
  Spacer,
  Image,
  Avatar,
  Stack,
  Button,
  Text,
} from "native-base";
import React, { useEffect, useState } from "react";

import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "native-base";
import { AuthentificationEnum } from "../ressources/enums/AuthentificationEnum";
import { storage } from "../services/AuthentificationService";
import Ionicons from "react-native-vector-icons/Ionicons";
import PublicationService from "../services/PublicationService";

export default function ListePublicationsScreen(props: any) {
  const [nomUtilisateur, setNomUtilisateur] = useState<any | null>(null);
  useEffect(() => {
    var user_json = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";
    setNomUtilisateur(JSON.parse(user_json).userName);
  }, []);
  let listePublications: any[];
  let isLoading: boolean = true;

  PublicationService.GetAllPublicationsByUser(1).then((result) => {
    listePublications = result;
    isLoading = false;
  });

  if (isLoading) {
    return <Text style={{ margin: 100 }}>Loading...</Text>;
  } else {
    return (
      <View style={styles.container}>
        <Stack direction="row" style={styles.header}>
          <Avatar
            size={100}
            source={{
              uri: "https://i.redd.it/flmx8fb1dzz41.jpg",
            }}
          ></Avatar>

          <Center marginLeft={2}>
            <Text style={styles.text}>{nomUtilisateur}</Text>
          </Center>

          <Spacer />

          <Center>
            <TouchableOpacity>
              <Ionicons name={"options-outline"} size={30} />
            </TouchableOpacity>
          </Center>
        </Stack>
        <Text style={styles.description}>Bonjour je suis une description</Text>

        <Text style={styles.text}>Publications</Text>
        <Box
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "black",
            marginTop: 10,
            marginBottom: 10,
          }}
        ></Box>
        {/* Print the list after it is initialized */}
        {/* {listePublications.map((publication) => (
          <View key={publication.id}>
            <Text>{publication.titre}</Text>
          </View>
        ))} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    // flexDirection: "column",
  },
  header: {
    margin: 10,
    marginTop: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    // put if on left
    margin: 10,
    marginTop: 5,

    fontSize: 15,
  },
});
