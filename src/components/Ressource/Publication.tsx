import { Text, Box, Spacer, Center, Stack, Avatar } from "native-base";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  LayoutChangeEvent,
} from "react-native";
import Description from "../Description";
import PublicationService from "../../services/PublicationService";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DoubleTap } from "../DoubleTap";
import moment from "moment";
import FastImage from "react-native-fast-image";
import Video from "react-native-video";

const apiURL = "https://api.victor-gombert.fr/api/v1/utilisateurs";
const piecesJointesURL = "https://api.victor-gombert.fr/api/v1/piecesJointes";

const Publication = (props: any) => {
  const [liked, setLiked] = React.useState(false);

  function LikePublication() {
    setLiked(!liked);
    console.log("props", props);
    PublicationService.AddLikeToPublication(1).then((res) => {
      console.log("TODO: like publication");
    });
  }

  function ShowCommentsSection() {
    props.navigation.navigate("EspaceCommentaireScreen", {
      id: props.id,
      titre: props.titre,
    });
  }

  function SauvegarderPublication() {
    PublicationService.SauvegarderPublication(1).then((res) => {
      console.log("TODO: sauvegarder publication");
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
      categorie: props.categorie,
      idPieceJointe: props.idPieceJointe,
      typePj: props.typePieceJointe,
      dateActivite: props.dateActivite,
      contenu: props.contenu,
      status: props.status,
      raisonRefus: props.raisonRefus,
      dateCreation: JSON.stringify(props.dateCreation),
      datePublication: JSON.stringify(props.datePublication),
      lienImage: props.lienImage,
    });
  }

  const image = () => {
    return (
      <View key={props.id}>
        <FastImage
          style={styles.image}
          source={{
            uri: piecesJointesURL + "/" + props.id + "/download",
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    );
  };

  const [videoAspectRatio, setVideoAspectRatio] = React.useState(1);

  //FIXME : Each child in a list should have a unique "key" prop. (only on video?)
  const video = () => {
    return (
      <View key={props.id}>
        <Video
          source={{
            uri: piecesJointesURL + "/" + props.id + "/download",
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="center"
          shouldPlay={true}
          isLooping={true}
          //TODO seulement dans détails publication
          //controls={true}
          style={[styles.video, { aspectRatio: videoAspectRatio }]}
          onLayout={(e: LayoutChangeEvent) => {
            const { width, height } = e.nativeEvent.layout;
            setVideoAspectRatio(width / height);
          }}
        />
      </View>
    );
  };

  // const pdf = () => {
  //   return (

  //     <object data="http://africau.edu/images/default/sample.pdf" type="application/pdf" width="100%" height="100%">
  //       <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>
  //     </object>
  //   );
  // };

  // const activite = () => {
  //   return (
  //     <View style={styles.activite}>
  //       <FastImage
  //         source={{
  //           uri: "api.victor-gombert.fr/api/v1/piecesJointes/9/download",
  //           priority: FastImage.priority.normal,
  //         }}
  //         />

  //       <Text style={styles.activiteText}>{[
  //         props.contenu,
  //         moment(props.dateActivite).fromNow() === "Invalid date" ? "quelques secondes" : moment(props.dateActivite).fromNow()
  //       ]
  //         }</Text>

  //     </View>
  //   );
  // };

  return (
    <Box style={[styles.container, styles.shadow]}>
      <Stack direction="row" style={styles.header}>
        <Avatar
          source={{
            uri: apiURL + "/" + props.utilisateurId + "/download",
          }}
        ></Avatar>

        <Stack direction="column" marginLeft={2}>
          <Text>Partagé par {props.auteur}</Text>
          <View style={styles.categorieWrapper}>
            <Text style={styles.categorie}>{props.categorie}</Text>
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

      <DoubleTap
        AfficherPublication={AfficherPublication}
        LikePublication={LikePublication}
      >
        <View>
          <Text style={styles.titre}>{props.titre}</Text>
          <View>
            {props.typePieceJointe === "IMAGE" && (
              <View key={`${props.idPieceJointe}-image`}>{image()}</View>
            )}
            {props.typePieceJointe === "VIDEO" && (
              <View key={`${props.idPieceJointe}-video`}>{video()}</View>
            )}
            {/*
  props.typePieceJointe === "ACTIVITE" && (
    <View key={`${props.idPieceJointe}-activite`}>{activite()}</View>
    )
    props.typePieceJointe === "PDF" && (
      <View key={`${props.idPieceJointe}-pdf`}>{pdf()}</View>
      )
    */}
          </View>
        </View>
      </DoubleTap>

      <Description contenu={props.contenu}></Description>

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
    backgroundColor: "white",
    marginVertical: 7,
    borderRadius: 10,
    zIndex: 100,
  },
  categorie: {
    backgroundColor: "#F2F2F2",
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
    marginTop: 10,
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
  },
  image: {
    marginTop: 10,
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
  },
  video: {
    marginTop: 0,
    width: "100%",
    height: undefined,
    marginBottom: 0,
    aspectRatio: 1,
  },
  activite: {
    marginTop: 10,
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
  activiteText: {
    fontSize: 16,
    marginHorizontal: 10,
    textAlign: "center",
  },
  footer: {
    margin: 20,
    marginVertical: 10,
  },
  date: {
    color: "#828282",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 2,
  },
});
