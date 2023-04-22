import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import DocumentPicker from "react-native-document-picker";
import RNFetchBlob from "rn-fetch-blob";

function AjouterPjScreen({ soumettre }: any) {
  const [lien, setLien] = useState("");

  const selectionnerFichier = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.images,
          DocumentPicker.types.video,
          DocumentPicker.types.pdf,
        ],
      });
      setLien(result[0].uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // L'utilisateur a annulé la sélection de fichier
      } else {
        throw err;
      }
    }
  };

  const soumettrePieceJointe = async () => {
    if (lien.length === 0) {
      console.warn("Veuillez sélectionner un fichier avant de soumettre.");
    } else {
      try {
        const pieceJointe = new FormData();
        const fileBlob = await RNFetchBlob.fs.readFile(lien, "base64");
        const blob = new Blob([fileBlob], { type: "multipart/form-data" });
        pieceJointe.append("file", blob, "fichier");
        soumettre(blob);
      } catch (erreur) {
        console.error(
          "Erreur lors de la soumission de la pièce jointe:",
          erreur
        );
      }
    }
  };

  return (
    <ScrollView style={styles.conteneur}>
      <Button
        mode="contained"
        onPress={selectionnerFichier}
        style={styles.boutonSelectionFichier}
      >
        Sélectionner un fichier
      </Button>
      <Button
        mode="contained"
        onPress={soumettrePieceJointe}
        style={styles.boutonSoumettre}
      >
        Ajouter la pièce jointe
      </Button>

      {lien.length > 0 && (
        <Text style={styles.texte}>Pièce jointe sélectionnée : {lien}</Text>
      )}
    </ScrollView>
  );
}

export default AjouterPjScreen;

const styles = StyleSheet.create({
  conteneur: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  boutonSelectionFichier: {
    marginBottom: 16,
  },
  boutonSoumettre: {
    marginTop: 16,
  },
  texte: {
    marginVertical: 16,
  },
});
