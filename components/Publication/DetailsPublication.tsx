import {
  Avatar,
  Box,
  Center,
  Spacer,
  Stack,
  Text,
  Image,
  ScrollView,
} from "native-base";
import { TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import PublicationService from "../../services/PublicationService";
import dayjs from "dayjs";
import React from "react";
import { DoubleTap } from "../DoubleTap";
import moment from "moment";

const DetailsPublication = (props: any) => {
  const [liked, setLiked] = React.useState(false);

  function LikePublication() {
    setLiked(!liked);
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
      contenu: props.contenu,
      status: props.status,
      raisonRefus: props.raisonRefus,
      dateCreation: JSON.stringify(props.dateCreation),
      lienImage: props.lienImage,
    });
  }

  const {
    auteur,
    titre,
    contenu,
    dateCreation,
    status,
    raisonRefus,
    lienImage,
  } = props.route.params;

  const date = new Date(
    Date.parse(dayjs(dateCreation).format("YYYY-MM-DDTHH:mm:ss"))
  );

  return (
    <Box style={styles.container}>
      <ScrollView>
        <Stack direction="row" style={styles.header}>
          <Avatar
            source={{
              uri: "https://i.imgflip.com/2xc9z0.png",
            }}
          ></Avatar>

          <Center marginLeft={2}>
            <Text>Partagé par {auteur}</Text>
          </Center>

          <Spacer />

          <Center>
            <Text>{moment(date).fromNow()}</Text>
          </Center>
        </Stack>

        <Text style={styles.titre}>{titre}</Text>

        <Text style={styles.contenu}>{contenu}</Text>

        <DoubleTap AfficherPublication={null} LikePublication={LikePublication}>
          <Image
            style={styles.image}
            source={{
              uri: lienImage,
            }}
            alt={titre + " image"}
            size="xl"
          />
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
      </ScrollView>
    </Box>
  );
};

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
    textAlign: "justify",
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

export default DetailsPublication;
