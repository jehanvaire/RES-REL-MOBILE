import React, { useState, useCallback, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Platform,
  LayoutChangeEvent,
  TextInput,
} from "react-native";
import Pdf from "react-native-pdf";
import { useNavigation, CommonActions } from "@react-navigation/native";
import PublicationService from "../../services/PublicationService";
import DocumentPicker from "react-native-document-picker";
import { PublicationEntity } from "../../ressources/models/PublicationEntity";
import { PieceJointeEntity } from "../../ressources/models/PieceJointeEntity";
import RNFS from "react-native-fs";
import { UtilisateurEntity } from "../../ressources/models/UtilisateurEntity";
import { storage } from "../../services/AuthentificationService";
import { AuthentificationEnum } from "../../ressources/enums/AuthentificationEnum";
import ReactNativeBlobUtil from "react-native-blob-util";
import FastImage from "react-native-fast-image";
import Video from "react-native-video";
import { Button, FormControl, Select } from "native-base";

function CreationRessourceScreen() {
  const navigation = useNavigation();

  const [pieceJointe, setPieceJointe] = useState({} as PieceJointeEntity);

  const [menuVisible, setMenuVisible] = useState(false);

  const [publication, setPublication] = useState({} as PublicationEntity);
  const [utilisateur, setUtilisateur] = useState({} as UtilisateurEntity);
  const [videoAspectRatio, setVideoAspectRatio] = React.useState(1);

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

    const fileBlob = await ReactNativeBlobUtil.fs.readFile(filePath, "base64");

    // const buffer = Buffer.from(fileBlob, "base64");
    // const file = new Blob([buffer], { type: result.type ?? "" });

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
      if (!pieceJointe || !pieceJointe.hasOwnProperty("type")) {
        gererNavigation();
        return;
      }

      const formData = new FormData();
      formData.append("file", pieceJointe.file);
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
      return (
        <FastImage
          style={styles.image}
          source={{
            uri: uri,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      );
    } else if (pieceJointe.type.startsWith("video/")) {
      return (
        <Video
          source={{
            uri: uri,
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
        placeholder="Titre"
        value={publication.titre}
        onChangeText={gererChangementTitre}
        style={styles.input}
      />
      <TextInput
        placeholder="Contenu"
        value={publication.contenu}
        onChangeText={validerContenu}
        style={styles.input}
        multiline
        numberOfLines={4}
      />
      <FormControl>
        <FormControl.Label>Catégorie</FormControl.Label>
        <Select
          selectedValue={selectedCategorie.nom}
          minWidth={200}
          accessibilityLabel="Sélectionnez une catégorie"
          placeholder="Sélectionnez une catégorie"
          onValueChange={(itemValue) => {
            const catSelectionnee: any = categories.find(
              (c) => c.nom === itemValue
            );
            setSelectedCategorie(catSelectionnee);
          }}
          defaultValue=""
          _selectedItem={{
            bg: "teal.600",
          }}
        >
          <Select.Item key="0" label="Toutes les catégorie" value="0" />
          {categories.map((categorie: any) => (
            <Select.Item
              key={categorie.id}
              label={categorie.nom}
              value={categorie.nom}
            />
          ))}
        </Select>
      </FormControl>
      {/* <Portal>
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
        </Menu>
      </Portal> */}

      <Button
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
