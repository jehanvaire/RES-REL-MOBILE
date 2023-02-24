import { Text, Box, Spacer, Center, Stack, Avatar, Image } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Description from "../Description";
import PublicationService from "../../services/PublicationService";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DoubleTap } from "../DoubleTap";

const Publication = (props: any) => {
  function GetDiffTime(date: Date) {
    if (!date) return "unknown";
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (seconds < 0) return "dans le futur";
    if (seconds < 60) return seconds + "s";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return minutes + "m";
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return hours + "h";
    const days = Math.floor(hours / 24);
    if (days < 7) return days + " jours";
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return weeks + " semaines";
    const months = Math.floor(days / 30);
    if (months < 12) return months + " mois";
    const years = Math.floor(days / 365);
    if (years < 2) return years + " an";
    return years + " ans";
  }

  function LikePublication() {
    PublicationService.AddLikeToPublication(1).then((res) => {
      console.log(res);
    });
  }

  function ShowCommentsSection() {
    console.log("TODO: show comments section");
  }

  function SauvegarderPublication() {
    PublicationService.SauvegarderPublication(1).then((res) => {
      console.log(res);
    });
  }

  function AfficherPlusOptions() {
    console.log("TODO: afficher plus d'options");
  }

  function AfficherPublication() {
    props.navigation.navigate("DetailsPublication", {
      auteur: props.auteur,
      titre: props.titre,
      description: props.description,
      status: props.status,
      raisonRefus: props.raisonRefus,
      dateCreation: JSON.stringify(props.dateCreation),
      lienImage: props.lienImage,
    });
  }
  return (
    <Box style={styles.container}>
      <Stack direction="row" style={styles.header}>
        <Avatar
          source={{
            uri: "https://i.imgflip.com/2xc9z0.png",
          }}
        ></Avatar>

        <Center marginLeft={2}>
          <Text>Partagé par {props.auteur}</Text>
        </Center>

        <Spacer />

        <Center>
          <Text>Il y a {GetDiffTime(props.dateCreation)}</Text>
        </Center>
      </Stack>

      <Box>
        <Text style={styles.titre}>{props.titre}</Text>
      </Box>

      <Box>
        <Description description={props.description}></Description>
      </Box>

      <Box>
        <DoubleTap
          AfficherPublication={AfficherPublication}
          LikePublication={LikePublication}
        >
          <Image
            style={styles.image}
            source={{
              uri: props.lienImage,
            }}
            alt={props.titre + " image"}
            size="xl"
          />
        </DoubleTap>
      </Box>

      <Stack direction="row" style={styles.footer}>
        <TouchableOpacity onPress={LikePublication}>
          <Ionicons name={"heart-outline"} size={25} />
        </TouchableOpacity>

        <Spacer />

        <TouchableOpacity onPress={ShowCommentsSection}>
          <Ionicons name={"chatbubble-outline"} size={25} />
        </TouchableOpacity>

        <Spacer />

        <TouchableOpacity onPress={SauvegarderPublication}>
          <Ionicons name={"bookmark-outline"} size={25} />
        </TouchableOpacity>

        <Spacer />

        <TouchableOpacity onPress={AfficherPlusOptions}>
          <Ionicons name={"ellipsis-vertical"} size={25} />
        </TouchableOpacity>
      </Stack>
    </Box>
  );
};

export default Publication;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "whitesmoke",
    marginVertical: 7,
  },
  header: {
    margin: 10,
    marginTop: 5,
  },
  titre: {
    fontSize: 26,
    fontWeight: "bold",
    paddingTop: 10,
    textBreakStrategy: "simple",
    marginHorizontal: 10,
  },
  description: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  image: {
    marginTop: 10,
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
  button: {
    padding: 5,
    fontSize: 25,
  },
  footer: {
    margin: 20,
    marginVertical: 10,
  },
});
