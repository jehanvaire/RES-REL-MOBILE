import { Text, Box, Spacer, Center, Stack, Avatar } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity, View, LayoutChangeEvent } from "react-native";
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
      <View key={props.idPieceJointe}>
        <FastImage
          style={styles.image}
          source={{
            uri: piecesJointesURL + '/' + props.idPieceJointe + "/download",
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
      <View key={props.idPieceJointe}>
        <Video

          source={{
            uri: piecesJointesURL + '/' + props.idPieceJointe + "/download",
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="center"
          shouldPlay={true}
          isLooping={true}
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

  const renderPublication = () => {
    if (props.typePieceJointe !== 'ACTIVITE') {
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

          <Text style={styles.titre}>{props.titre}</Text>

          <DoubleTap
            AfficherPublication={AfficherPublication}
            LikePublication={LikePublication}
          >
            <View>
              {props.typePieceJointe === "IMAGE" && (
                <View key={`${props.idPieceJointe}-image`}>{image()}</View>
              )}
              {props.typePieceJointe === "VIDEO" && (
                <View key={`${props.idPieceJointe}-video`}>{video()}</View>
              )}
              {/*
              props.typePieceJointe === "PDF" && (
                <View key={`${props.idPieceJointe}-pdf`}>{pdf()}</View>
              )
              */}
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

    } else {
      return (
        <Box style={[styles.container, styles.shadow]}>
          {/* <Stack direction="row" style={styles.header}>
          
         
           

          </Stack> */}
          <View style={styles.containerActivite}>
            <FastImage
              style={styles.coverActivite}
              source={{
                uri: 'data:image/jpeg;base64,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',
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>

        </Box>
      );
    }
  };

  return renderPublication();
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
  containerActivite: {
    width: "100%",
    height: undefined,
    overflow: "hidden",
    borderRadius: 10,
  },
  coverActivite: {
    width: "100%",
    
    aspectRatio: 16 / 11,
  },
});
