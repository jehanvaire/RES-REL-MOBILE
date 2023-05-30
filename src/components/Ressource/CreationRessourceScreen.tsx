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
import FastImage from "react-native-fast-image";
import Video from "react-native-video";
import { FormControl, Select } from "native-base";
import CategorieService from "../../services/CategorieService";
import { TouchableOpacity } from "react-native";

function CreationRessourceScreen() {
  const navigation = useNavigation();

  const [pieceJointe, setPieceJointe] = useState({} as PieceJointeEntity);

  const [categories, setCategories] = useState([] as CategorieEntity[]);

  const [publication, setPublication] = useState({} as PublicationEntity);
  const [utilisateur, setUtilisateur] = useState({} as UtilisateurEntity);
  const [videoAspectRatio, setVideoAspectRatio] = React.useState(1);

  useEffect(() => {
    var user_json = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";
    var user = JSON.parse(user_json) as UtilisateurEntity;
    setUtilisateur(user);

    CategorieService.GetAllCategories().then((categories: any) => {
      setCategories(categories);
    });
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

    filePath = "file://" + filePath;

    console.log("filePath", filePath);
    const nouvellePieceJointe = {
      idUtilisateur: utilisateur.id,
      type: result.type,
      titre: result.name,
      taille: result.size,
      uri: filePath,
      file: {
        uri: filePath,
        name: result.name,
        type: result.type,
      },
    } as PieceJointeEntity;

    setPieceJointe(nouvellePieceJointe);
  };

  const soumettre = async () => {
    await PublicationService.CreerPublication({
      idCategorie: publication.categorie.id,
      contenu: publication.contenu,
      titre: publication.titre,
      idUtilisateur: utilisateur.id,
    } as PublicationEntity).then(async (res) => {
      console.log("res", res);
      if (!pieceJointe || !pieceJointe.hasOwnProperty("type")) {
        gererNavigation();
        return;
      }

      const formData = new FormData();
      formData.append("file", pieceJointe.file, "file");
      formData.append("titre", pieceJointe.titre);
      formData.append("type", pieceJointe.type);
      formData.append("idUtilisateur", String(utilisateur.id));
      formData.append("idRessource", String(res.id));

      console.log("formData", formData);

      try {
        PublicationService.AjouterPieceJointe(formData).then((res) => {
          console.log("pj", res);
          gererNavigation();
        });
      } catch (error) {
        console.error("Error:", error);
      }
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
        ? pieceJointe.uri.replace("content://", "")
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
      <FormControl style={styles.formData}>
        <FormControl.Label>Titre</FormControl.Label>

        <TextInput
          placeholder="Titre"
          value={publication.titre}
          onChangeText={gererChangementTitre}
          style={styles.input}
        />
        <FormControl.Label>Description/Contenu</FormControl.Label>

        <TextInput
          placeholder="Contenu"
          value={publication.contenu}
          onChangeText={validerContenu}
          style={styles.input}
          multiline
          numberOfLines={4}
        />
        <FormControl.Label>Catégorie</FormControl.Label>

        <Select
          selectedValue={publication?.categorie?.nom}
          minWidth={200}
          accessibilityLabel="Sélectionnez une catégorie"
          placeholder="Sélectionnez une catégorie"
          onValueChange={(itemValue) => {
            const catSelectionnee: any = categories.find(
              (c) => c.nom === itemValue
            );
            setPublication({
              ...publication,
              categorie: catSelectionnee as CategorieEntity,
            });
          }}
          defaultValue=""
          _selectedItem={{
            bg: "teal.600",
          }}
        >
          {categories.map((categorie: any) => (
            <Select.Item
              key={categorie.id}
              label={categorie.nom}
              value={categorie.nom}
            />
          ))}
        </Select>

        <TouchableOpacity
          onPress={selectionnerPieceJointe}
          style={styles.bouton}
        >
          <Text>Sélectionner une pièce jointe</Text>
        </TouchableOpacity>

        {pieceJointe.uri && pieceJointe.uri.length > 0 && (
          <View style={styles.previewPieceJointe}>
            <Text style={styles.titrePieceJointe}>Pièce jointe :</Text>
            {renderPieceJointe()}
          </View>
        )}

        <TouchableOpacity
          onPress={() => soumettre()}
          disabled={
            publication?.titre?.length < LONGUEUR_MIN_TITRE ||
            publication?.contenu?.length === 0 ||
            !publication?.categorie?.nom
          }
          style={styles.bouton}
        >
          <Text>Soumettre une publication</Text>
        </TouchableOpacity>
      </FormControl>
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
    borderRadius: 5,
    paddingHorizontal: 16,
    borderColor: "#E0E0E0",
    borderWidth: 1,
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
  pdfPieceJointe: {
    width: "100%",
    height: 250,
    marginBottom: 16,
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
  bouton: {
    backgroundColor: "#4183F4",
    padding: 16,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 16,
  },
  formData: {
    marginBottom: 16,
  },
});
