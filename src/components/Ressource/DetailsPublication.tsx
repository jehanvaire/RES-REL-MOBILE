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
import {
  TouchableOpacity,
  StyleSheet,
  LayoutChangeEvent,
  Linking,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import PublicationService from "../../services/PublicationService";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
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
    idCategorie,
    idUtilisateur,
  } = props.route.params;
  const [fileName, setFileName] = useState("");

  const date = new Date(
    Date.parse(dayjs(datePublication).format("YYYY-MM-DDTHH:mm:ss"))
  );

  function LikePublication() {
    setLiked(!liked);
    PublicationService.AddLikeToPublication(1).then((res) => {
      console.log("TODO: like publication");
    });
  }

  function ShowCommentsSection() {
    props.navigation.navigate("EspaceCommentaireScreen", {
      id: id,
      titre: titre,
    });

    props.navigation.setOptions({
      title: "Commentaires",
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

  const fetchPdfName = async () => {
    const response = await PublicationService.getPdfName(idPieceJointe);
    const contentDisposition = response.headers["content-disposition"];
    const regex = /filename=([^;]+)/;
    const match = contentDisposition?.match(regex);

    if (match && match[1]) {
      setFileName(match[1]);
    }
  };

  const AfficherPdf = () => {
    props.navigation.navigate("PdfView", {
      idPieceJointe: idPieceJointe,
      nomFichier: fileName,
    });
  };

  const image = () => {
    return (
      <View key={idPieceJointe}>
        <FastImage
          style={styles.image}
          source={{
            uri: piecesJointesURL + "/" + idPieceJointe + "/download",
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    );
  };

  const [videoAspectRatio, setVideoAspectRatio] = React.useState(1);

  const video = (): any => {
    return (
      <View key={idPieceJointe}>
        <Video
          source={{
            uri: piecesJointesURL + "/" + idPieceJointe + "/download",
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
      </View>
    );
  };

  //only called on pdfs dont worry @Adrien
  useEffect(() => {
    if (typePj === "PDF") {
      fetchPdfName();
    }
  }, [props.pieceJointe?.type]);

  const pdf = () => {
    return (
      <View key={props.idPieceJointe}>
        <TouchableOpacity onPress={AfficherPdf} style={styles.containerPdf}>
          <View style={styles.pdfIcon}>
            <Ionicons name="document-outline" size={40} color="black" />
          </View>
          <Text style={styles.pdfText}>{fileName || "Chargement..."}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const openGps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    const scheme = Platform.OS === "ios" ? "maps:" : "geo:";
    const url =
      Platform.OS === "ios"
        ? `${scheme}?q=${encodedAddress}`
        : `${scheme}?q=${encodedAddress}&z=16`; // zoom level
    Linking.openURL(url);
  };

  return (
    <Box style={styles.container}>
      <ScrollView>
        <Stack direction="row" style={styles.header}>
          <Avatar
            source={{
              uri: apiURL + "/" + idUtilisateur + "/download",
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
              {moment(date).fromNow() === "Invalid date"
                ? "quelques secondes"
                : moment(date).fromNow()}
            </Text>
          </Center>
        </Stack>

        <Text style={styles.titre}>{titre}</Text>

        <DoubleTap AfficherPublication={null} LikePublication={LikePublication}>
          <View>
            {[
              typePj === "IMAGE" ? image() : null,
              typePj === "VIDEO" ? video() : null,
            ]}
          </View>
        </DoubleTap>
        <View>
          {/* Pas possible de double tap sinon ça nous envoie sur détails publication */}
          {typePj === "PDF" && (
            <View key={`${idPieceJointe}-pdf`}>{pdf()}</View>
          )}
        </View>

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
    paddingTop: 10,
    paddingBottom: 10,
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
  pdfIcon: {
    position: "absolute",
    left: 12,
    bottom: 15,
  },
  pdfText: {
    marginTop: 15,
    marginLeft: 55,
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 15,
    textBreakStrategy: "simple",
    marginHorizontal: 10,
    textAlign: "center",
    color: "black",
  },
  containerPdf: {
    flexDirection: "row",
    width: "auto",
    height: 75,
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#d9d9d9",
    borderColor: "black",
  },
});

export default DetailsPublication;
