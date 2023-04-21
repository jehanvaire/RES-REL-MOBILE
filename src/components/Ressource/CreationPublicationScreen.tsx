import React, { useState, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  Platform,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import Pdf from "react-native-pdf";
import { useNavigation, CommonActions } from "@react-navigation/native";
import PublicationService from "../../services/PublicationService";
import DocumentPicker, {
  DocumentPickerResponse,
} from "react-native-document-picker";
// import RNFetchBlob from 'rn-fetch-blob';
import RNFS from "react-native-fs";
import { WebView } from "react-native-webview";
import { Menu, Portal, Provider } from "react-native-paper";
import { PublicationEntity } from "../../ressources/models/PublicationEntity";

// import { FileSystem } from 'react-native-unimodules';

function CreationPublicationScreen() {
  const navigation = useNavigation();
  const [lienPieceJointe, setLienPieceJointe] = useState("");
  const [fileInfo, setFileInfo] = useState<{
    uri: string | null;
    type: string | null;
    name: string | null;
    size: number | null;
  }>({
    uri: null,
    type: null,
    name: null,
    size: null,
  });

  const [menuVisible, setMenuVisible] = useState(false);

  const [publication, setPublication] = useState({} as PublicationEntity);

  const ouvrirMenu = () => setMenuVisible(true);
  const fermerMenu = () => setMenuVisible(false);
  const selectionnerCategorie = (value: number) => {
    setPublication({ ...publication, idCategorie: value });
    fermerMenu();
  };

  const [utilisateur] = useState(1);

  const LONGUEUR_MIN_TITRE = 5;

  const validateTitle = (text: string) => {
    if (text.length < LONGUEUR_MIN_TITRE) {
      // console.warn(
      //   `Le titre doit contenir au moins ${LONGUEUR_MIN_TITRE} caractères.`
      // );
    }
    return true;
  };

  const validateContent = (text: string) => {
    if (text.length === 0) {
      console.warn("Le champ contenu ne doit pas être vide.");
      return false;
    }
    return true;
  };

  const gererChangementTitre = (texte: string) => {
    if (validateTitle(texte)) {
      setPublication({ ...publication, titre: texte });
    }
  };

  const validerContenu = (texte: string) => {
    if (validateContent(texte)) {
      setPublication({ ...publication, contenu: texte });
    }
  };
  const gererNavigation = useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "ListePublicationsScreen" }],
      })
    );
  }, [navigation]);

  const soumettre = async () => {
    try {
      // let pieceJointeId: number | null = null;
      // if (fileInfo && fileInfo.uri && fileInfo.type && fileInfo.name) {
      //   const formDataPieceJointe = new FormData();
      //   formDataPieceJointe.append("file", {
      //     uri: fileInfo.uri,
      //     type: fileInfo.type,
      //     name: fileInfo.name,
      //   } as unknown as Blob);

      //   const pieceJointeResponse = await PublicationService.AjouterPieceJointe(
      //     fileInfo
      //   );
      //   console.log("Piece jointe:", pieceJointeResponse);
      //   if (pieceJointeResponse?.data?.id) {
      //     pieceJointeId = pieceJointeResponse.data.id;
      //     console.log("Piece jointe ID:", pieceJointeId);
      //   } else {
      //     console.error("Erreur lors de l'ajout de la pièce jointe");
      //   }
      // }

      // ajout utilisateur
      publication.idUtilisateur = utilisateur;

      await PublicationService.CreerPublication(publication).then((res) => {
        console.log(res);
        gererNavigation();
      });
    } catch (error: any) {
      console.error(
        "Erreur lors de la soumission de la publication:",
        error.message
      );
    }
  };

  const selectionnerPieceJointe = async () => {
    try {
      const result = (
        await DocumentPicker.pickMultiple({
          type: [
            DocumentPicker.types.images,
            DocumentPicker.types.video,
            DocumentPicker.types.pdf,
          ],
        })
      )[0];
      console.log("Fichier sélectionné:", result);

      const androidContentUri = result.uri.startsWith("content://");
      let filePath = result.uri;

      if (androidContentUri) {
        const tempPath = `${RNFS.CachesDirectoryPath}/${result.name}`;
        await RNFS.copyFile(result.uri, tempPath);
        filePath = tempPath;
      }

      setLienPieceJointe(filePath);

      // Mettre à jour les informations de fileInfo
      setFileInfo({
        uri: filePath,
        type: result.type,
        name: result.name,
        size: result.size,
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("Annulation du choix de fichier");
      } else {
        throw err;
      }
    }
  };

  const renderPieceJointe = () => {
    if (
      !fileInfo ||
      fileInfo.uri === null ||
      !fileInfo.hasOwnProperty("type") ||
      !fileInfo.type
    ) {
      return <Text>Type de fichier non pris en charge</Text>;
    }
    const typeMime = fileInfo.type;

    const uri =
      Platform.OS === "android"
        ? "file://" + fileInfo.uri
        : fileInfo.uri.replace("file://", "");

    if (typeMime.startsWith("image/")) {
      return <Image source={{ uri }} style={styles.imagePieceJointe} />;
    } else if (typeMime.startsWith("video/")) {
      return (
        <WebView
          source={{ uri }}
          style={styles.videoPieceJointe}
          allowsFullscreenVideo={true}
          javaScriptEnabled={true}
          mediaPlaybackRequiresUserAction={false}
        />
      );
    } else if (typeMime === "application/pdf") {
      return <Pdf source={{ uri }} style={styles.pdfPieceJointe} />;
    } else {
      return <Text>Type de fichier non pris en charge</Text>;
    }
  };

  return (
    <ScrollView style={styles.conteneur}>
      <View style={styles.header}>
        <Text style={styles.title}>Créer une publication</Text>
      </View>
      <TextInput
        label="Titre"
        value={publication.titre}
        onChangeText={gererChangementTitre}
        style={styles.input}
      />
      <TextInput
        label="Contenu"
        value={publication.contenu}
        onChangeText={validerContenu}
        style={styles.input}
        multiline
        numberOfLines={4}
      />
      <Portal>
        <Menu
          visible={menuVisible}
          onDismiss={fermerMenu}
          anchor={
            <Button onPress={ouvrirMenu} style={styles.boutonCategorie}>
              Catégorie: {publication.idCategorie || "Sélectionner"}
            </Button>
          }
          style={styles.menuStyle}
        >
          {/* Voir pour récupérer les catégories depuis l'api puis sélectionner leur id */}
          <Menu.Item
            onPress={() => selectionnerCategorie(1)}
            title="Catégorie 1"
          />
          <Menu.Item
            onPress={() => selectionnerCategorie(2)}
            title="Catégorie 2"
          />
          <Menu.Item
            onPress={() => selectionnerCategorie(3)}
            title="Catégorie 3"
          />
          {/* Ajoutez d'autres catégories ici */}
        </Menu>
      </Portal>

      <Button
        mode="contained"
        onPress={selectionnerPieceJointe}
        style={styles.boutonSelectionFichier}
      >
        Sélectionner une pièce jointe
      </Button>

      {lienPieceJointe && lienPieceJointe.length > 0 && (
        <View style={styles.previewPieceJointe}>
          <Text style={styles.titrePieceJointe}>Pièce jointe :</Text>
          {renderPieceJointe()}
        </View>
      )}

      <Button
        mode="contained"
        onPress={() => soumettre()}
        style={styles.boutonSoumettre}
        disabled={
          publication?.titre?.length < LONGUEUR_MIN_TITRE ||
          publication?.contenu?.length === 0 ||
          !publication?.idCategorie
        }
      >
        Soumettre une publication
      </Button>
    </ScrollView>
  );
}

export default CreationPublicationScreen;

const styles = StyleSheet.create({
  conteneur: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#F5F5F5",
    borderRadius: 30,
  },
  boutonSoumettre: {
    marginTop: 16,
    backgroundColor: "#4183F4",
  },
  boutonSelectionFichier: {
    marginBottom: 16,
    backgroundColor: "#4183F4",
  },
  previewPieceJointe: {
    alignItems: "center",
    marginVertical: 16,
  },
  titrePieceJointe: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  imagePieceJointe: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginBottom: 16,
  },
  videoPieceJointe: {
    width: "100%",
    height: 250,
    marginBottom: 16,
  },
  pdfPieceJointe: {
    width: "100%",
    height: 250,
    marginBottom: 16,
  },
  boutonCategorie: {
    marginBottom: 16,
    backgroundColor: "#F5F5F5",
    borderRadius: 30,
    justifyContent: "center",
    alignSelf: "stretch",
    paddingHorizontal: 16,
  },
  menuStyle: {
    marginTop: 50,
    marginLeft: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});