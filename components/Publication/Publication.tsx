import { Text, Box, Spacer, Center, Stack, Avatar } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Description from "../Description";
import PublicationService from "../../services/PublicationService";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DoubleTap } from "../DoubleTap";
import moment from "moment";
import FastImage from "react-native-fast-image";

const apiURL = "https://api.victor-gombert.fr/api/v1/utilisateurs";

const Publication = (props: any) => {
  const [liked, setLiked] = React.useState(false);

  function LikePublication() {
    console.log(props);
    setLiked(!liked);
    PublicationService.AddLikeToPublication(1).then((res) => {
      console.log(res);
    });
  }

  function ShowCommentsSection() {
    props.navigation.navigate("EspaceCommentaireScreen");
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
      id: props.id,
      auteur: props.auteur,
      titre: props.titre,
      contenu: props.contenu,
      status: props.status,
      raisonRefus: props.raisonRefus,
      dateCreation: JSON.stringify(props.dateCreation),
      datePublication: JSON.stringify(props.datePublication),
      lienImage: props.lienImage,
    });
  }

  return (
    <Box style={styles.container}>
      <Stack direction="row" style={styles.header}>
        <Avatar
          source={{
            uri: apiURL + "/" + props.utilisateurId + "/download",
          }}
        ></Avatar>

        <Center marginLeft={2}>
          <Text>Partagé par {props.auteur}</Text>
        </Center>

        <Spacer />

        <Center>
          <Text>
            {moment(props.dateCreation).fromNow() === "Invalid date"
              ? "quelques secondes"
              : moment(props.dateCreation).fromNow()}
          </Text>
        </Center>
      </Stack>

      <Text style={styles.titre}>{props.titre}</Text>

      <Description contenu={props.contenu}></Description>

      <DoubleTap
        AfficherPublication={AfficherPublication}
        LikePublication={LikePublication}
      >
        <View>
          <FastImage
            style={styles.image}
            source={{
              uri: props.lienImage,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </DoubleTap>

      <Stack direction="row" style={styles.footer}>
        <TouchableOpacity onPress={LikePublication}>
          {liked ? (
            <Ionicons name={"heart"} size={25} color={"red"} />
          ) : (
            <Ionicons name={"heart-outline"} size={25} />
          )}
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
  contenu: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  image: {
    marginTop: 10,
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
  footer: {
    margin: 20,
    marginVertical: 10,
  },
});
