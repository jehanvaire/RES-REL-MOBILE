import React, { useState, useCallback, useEffect } from "react";
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
import DocumentPicker from "react-native-document-picker";
// import RNFetchBlob from "rn-fetch-blob";
import { WebView } from "react-native-webview";
import { Menu, Portal } from "react-native-paper";
import { PublicationEntity } from "../../ressources/models/PublicationEntity";
import { PieceJointeEntity } from "../../ressources/models/PieceJointeEntity";
import RNFS from "react-native-fs";
import { UtilisateurEntity } from "../../ressources/models/UtilisateurEntity";
import { storage } from "../../services/AuthentificationService";
import { AuthentificationEnum } from "../../ressources/enums/AuthentificationEnum";

// import { FileSystem } from 'react-native-unimodules';

function CreationRessourceScreen() {
  const navigation = useNavigation();

  const [pieceJointe, setPieceJointe] = useState({} as PieceJointeEntity);

  const [menuVisible, setMenuVisible] = useState(false);

  const [publication, setPublication] = useState({} as PublicationEntity);
  const [utilisateur, setUtilisateur] = useState({} as UtilisateurEntity);

  const ouvrirMenu = () => setMenuVisible(true);
  const fermerMenu = () => setMenuVisible(false);
  const selectionnerCategorie = (value: number) => {
    setPublication({ ...publication, idCategorie: value });
    fermerMenu();
  };

  useEffect(() => {
    var user_json = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";
    var user = JSON.parse(user_json) as UtilisateurEntity;
    setUtilisateur(user);
  }, []);

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

  const selectionnerPieceJointe = async () => {
    const result = await DocumentPicker.pickSingle({
      type: [
        DocumentPicker.types.images,
        DocumentPicker.types.video,
        DocumentPicker.types.pdf,
      ],
    });

    const androidContentUri = result.uri.startsWith("content://");
    let filePath = result.uri;

    if (androidContentUri) {
      if (androidContentUri) {
        const tempPath = `${RNFS.CachesDirectoryPath}/${result.name}`;
        await RNFS.copyFile(result.uri, tempPath);
        await RNFS.copyFile(result.uri, tempPath);
        filePath = tempPath;
        filePath = tempPath;
      }
    }

    // const fileBlob = await RNFetchBlob.fs.readFile(filePath, "base64");

    const fileBlob = null;

    const nouvellePieceJointe = {
      idUtilisateur: utilisateur.id,
      type: result.type,
      titre: result.name,
      taille: result.size,
      uri: filePath,
      file: fileBlob,
    } as PieceJointeEntity;

    setPieceJointe(nouvellePieceJointe);
  };

  const soumettre = async () => {
    publication.idUtilisateur = utilisateur.id;
    await PublicationService.CreerPublication(publication).then((res) => {
      console.log("res", res);
      if (!pieceJointe || !pieceJointe.hasOwnProperty("type")) {
        gererNavigation();
        return;
      }

      const formData = new FormData();
      formData.append("file", pieceJointe.file, pieceJointe.titre);
      formData.append("titre", pieceJointe.titre);
      formData.append("type", pieceJointe.type);
      formData.append("idUtilisateur", String(utilisateur));
      formData.append("idRessource", String(res.id));

      PublicationService.AjouterPieceJointe(formData).then((res) => {
        console.log("pj", res);
        gererNavigation();
      });
    });
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
        ? "file:///" + pieceJointe.uri.replace("content://", "")
        : pieceJointe.uri.replace("content://", "");

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
