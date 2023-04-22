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
import RNFetchBlob from "rn-fetch-blob";
import RNFS from "react-native-fs";
import { WebView } from "react-native-webview";
import { Menu, Portal, Provider } from "react-native-paper";
import { PublicationEntity } from "../../ressources/models/PublicationEntity";
import { PieceJointeEntity } from "../../ressources/models/PieceJointeEntity";

// import { FileSystem } from 'react-native-unimodules';

function CreationRessourceScreen() {
  const navigation = useNavigation();

  const [pieceJointe, setPieceJointe] = useState({} as PieceJointeEntity);

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
    // ajout utilisateur
    publication.idUtilisateur = utilisateur;

    await PublicationService.CreerPublication(publication).then((res) => {
      console.log("res", res);

      // // à déplacer dans le service si on le garde
      const formData = new FormData();
      formData.append("file", pieceJointe.file, pieceJointe.titre);
      formData.append("titre", pieceJointe.titre);
      formData.append("type", pieceJointe.type);
      formData.append("idUtilisateur", String(pieceJointe.idUtilisateur));
      formData.append("idRessource", String(res.id));

      PublicationService.AjouterPieceJointe(formData).then((res) => {
        console.log("pj", res);
        gererNavigation();
      });
    });
  };

  const selectionnerPieceJointe = async () => {
    const result = (
      await DocumentPicker.pickMultiple({
        type: [
          DocumentPicker.types.images,
          DocumentPicker.types.video,
          DocumentPicker.types.pdf,
        ],
      })
    )[0];
    const androidContentUri = result.uri.startsWith("content://");
    let filePath = result.uri;

    const fileBlob = await RNFetchBlob.fs.readFile(filePath, "base64");
    // const blob = new Blob([fileBlob], { type: "multipart/form-data" });

    // console.log("blob", blob.size, filePath);

    // if (androidContentUri) {
    //   const tempPath = `${RNFS.CachesDirectoryPath}/${result.name}`; // chemin temporaire
    //   await RNFS.copyFile(result.uri, tempPath); // copie du fichier
    //   filePath = tempPath;
    // }

    const nouvellePieceJointe = {
      idUtilisateur: utilisateur,
      type: result.type,
      titre: result.name,
      taille: result.size,
      uri: filePath,
      file: fileBlob,
    } as PieceJointeEntity;

    setPieceJointe(nouvellePieceJointe);
  };

  const renderPieceJointe = () => {
    if (
      !pieceJointe ||
      pieceJointe.uri === null ||
      !pieceJointe.hasOwnProperty("type") ||
      !pieceJointe.type
    ) {
      return <Text>Type de fichier non pris en charge</Text>;
    }

    const uri =
      Platform.OS === "android"
        ? "file://" + pieceJointe.uri
        : pieceJointe.uri.replace("file://", "");

    console.log("uri", uri);

    if (pieceJointe.type.startsWith("image/")) {
      return <Image source={{ uri }} style={styles.imagePieceJointe} />;
    } else if (pieceJointe.type.startsWith("video/")) {
      return (
        <WebView
          source={{ uri }}
          style={styles.videoPieceJointe}
          allowsFullscreenVideo={true}
          javaScriptEnabled={true}
          mediaPlaybackRequiresUserAction={false}
        />
      );
    } else if (pieceJointe.type === "application/pdf") {
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

      {pieceJointe.uri && pieceJointe.uri.length > 0 && (
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

export default CreationRessourceScreen;

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    padding: 16,
    marginVertical: 32,
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
