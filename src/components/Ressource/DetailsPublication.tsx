import {
  Avatar,
  Box,
  Center,
  Spacer,
  Stack,
  Text,
  ScrollView,
  View,
} from "native-base";
import { TouchableOpacity, StyleSheet, LayoutChangeEvent } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import PublicationService from "../../services/PublicationService";
import dayjs from "dayjs";
import React from "react";
import { DoubleTap } from "../DoubleTap";
import moment from "moment";
import FastImage from "react-native-fast-image";
import Video from "react-native-video";

const apiURL = "https://api.victor-gombert.fr/api/v1/utilisateurs";
const piecesJointesURL = "https://api.victor-gombert.fr/api/v1/piecesJointes";

const DetailsPublication = (props: any) => {
  const [liked, setLiked] = React.useState(false);

  const {
    id,
    auteur,
    titre,
    categorie,
    idPieceJointe,
    typePj,
    dateActivite,
    contenu,
    dateCreation,
    datePublication,
    status,
    raisonRefus,
    lienImage,
  } = props.route.params;

  function LikePublication() {
    setLiked(!liked);
    PublicationService.AddLikeToPublication(1).then((res) => {
      console.log(res);
    });
  }

  function ShowCommentsSection() {
    props.navigation.navigate("EspaceCommentaireScreen", {
      id: id,
      titre: titre,
    });
  }

  function SauvegarderPublication() {
    PublicationService.SauvegarderPublication(1).then((res) => {
      console.log(res);
    });
  }

  function AfficherPlusOptions() {
    console.log(datePublication);
    console.log("TODO: afficher plus d'options");
  }

  const date = new Date(
    Date.parse(dayjs(datePublication).format("YYYY-MM-DDTHH:mm:ss"))
  );


  const image = () => {
    return (
      <FastImage
        style={styles.image}
        source={{
          uri: piecesJointesURL + '/' + idPieceJointe + "/download",
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    );
  };
  
  const [videoAspectRatio, setVideoAspectRatio] = React.useState(1);

  //FIXME : Each child in a list should have a unique "key" prop. (only on video?)
  const video = () => {
    return (
      <Video
        source={{
          uri: piecesJointesURL + '/' + idPieceJointe + "/download",
        }}
        id={idPieceJointe}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="center"
        shouldPlay={true}
        isLooping={true}
        controls={true}
        style={[styles.video, { aspectRatio: videoAspectRatio }]}
        onLayout={(e: LayoutChangeEvent) => {
          const { width, height } = e.nativeEvent.layout;
          setVideoAspectRatio(width / height);
        }}
      />
    );
  };


  return (
    <Box style={styles.container}>
      <ScrollView>
        <Stack direction="row" style={styles.header}>
          <Avatar
            source={{
              uri: apiURL + "/" + id + "/download",
            }}
          ></Avatar>

          <Stack direction="column" marginLeft={2}>
            <Text>Partagé par {auteur}</Text>
            <View style={styles.categorieWrapper}>
              <Text style={styles.categorie}>{categorie}</Text>
            </View>
          </Stack>

          <Spacer />

          <Center>
            <Text style={styles.date}>
              {moment(props.dateCreation).fromNow() === "Invalid date"
                ? "quelques secondes"
                : moment(props.dateCreation).fromNow()}
            </Text>
          </Center>
        </Stack>

        <Text style={styles.titre}>{titre}</Text>

        <DoubleTap AfficherPublication={null} LikePublication={LikePublication}>
          <View>
            {[
              typePj === "IMAGE" ? image() : null,
              typePj === "VIDEO" ? video() : null,
              //props.typePieceJointe === "ACTIVITE" ? activite() : null,
              //props.typePieceJointe === "PDF" ? pdf() : null,
            ]}
          </View>
        </DoubleTap>

        <Text style={styles.contenu}>{contenu}</Text>

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
    marginVertical: 0,
  },
  categorie: {
    backgroundColor: "#FF9393",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  categorieWrapper: {
    borderRadius: 10,
    paddingHorizontal: 1,
    alignSelf: "flex-start",
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
    textAlign: "center",
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
  video: {
    marginTop: 0,
    width: "100%",
    height: undefined,
    marginBottom: 0,
    aspectRatio: 1,
  },
  footer: {
    margin: 20,
    marginVertical: 10,
  },
  date: {
    color: "#828282",
  },
});

export default DetailsPublication;
