import {
  Box,
  Center,
  Spacer,
  Image,
  Avatar,
  Stack,
  Button,
  Text,
  Actionsheet,
} from "native-base";
import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { View } from "native-base";
import { AuthentificationEnum } from "../ressources/enums/AuthentificationEnum";
import { storage } from "../services/AuthentificationService";
import Ionicons from "react-native-vector-icons/Ionicons";
import PublicationService from "../services/PublicationService";
import Publication from "../components/Publication";
import { Utilisateur } from "../ressources/types/Utilisateur";
import Description from "../components/Description";
import MenuHamburgerProfil from "../components/MenuHamburgerProfil";

export default function ListePublicationsScreen(props: any) {
  const [listePublications, setListePublications] = useState<any[]>([]);
  const [utilisateur, setUtilisateur] = useState<Utilisateur>(
    {} as Utilisateur
  );

  const fetchListePublicationsUtilisateur = async () => {
    // Get the list of publications
    const listePublications =
      await PublicationService.GetListePublicationsUtilisateur(1);
    setListePublications(listePublications);
  };

  useEffect(() => {
    var user_json = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";
    fetchListePublicationsUtilisateur();

    var user = JSON.parse(user_json) as Utilisateur;
    setUtilisateur(user);
  }, []);

  const scrollY = new Animated.Value(0);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 100],
    extrapolate: "clamp",
  });

  const headerStyle = {
    height: headerHeight,
  };

  return (
    <View style={styles.container}>
      <Stack direction="row" style={styles.header}>
        <Avatar
          size={100}
          source={{
            uri: utilisateur.lienPhoto,
          }}
        ></Avatar>

        <Center marginLeft={2}>
          <Text style={styles.text}>
            {utilisateur.nom} {utilisateur.prenom}
          </Text>
        </Center>

        <Spacer />

        <Center>
          <MenuHamburgerProfil></MenuHamburgerProfil>

          {/* <TouchableOpacity>
            <Ionicons name={"options-outline"} size={30} />
          </TouchableOpacity> */}
        </Center>
      </Stack>
      <ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <Description description={utilisateur.description ?? ""}></Description>

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
        {listePublications.map((publication) => (
          <View key={publication.id}>
            <Publication
              auteur={publication.auteur}
              titre={publication.titre}
              description={publication.description}
              status={publication.status}
              raisonRefus={publication.raisonRefus}
              dateCreation={publication.dateCreation}
              lienImage={publication.lienImage}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
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
    margin: 10,
    marginTop: 5,
    fontSize: 15,
  },
});
