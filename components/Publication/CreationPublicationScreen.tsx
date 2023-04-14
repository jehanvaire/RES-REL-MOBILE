import React, { useState, useCallback } from 'react';
import { ScrollView, StyleSheet, View, Image, Text, Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Pdf from 'react-native-pdf';
import { useNavigation, CommonActions } from '@react-navigation/native';
import PublicationService from '../../services/PublicationService';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import { WebView } from 'react-native-webview'

// import { FileSystem } from 'react-native-unimodules';



function CreationPublicationScreen() {
    const navigation = useNavigation();
    const [titre, setTitre] = useState('');
    const [contenu, setContenu] = useState('');
    const [lienPieceJointe, setLienPieceJointe] = useState('');
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
    

    const [Utilisateur] = useState('1051');
    const [Categorie] = useState('2');

    const LONGUEUR_MIN_TITRE = 5;

    const validateTitle = (text: string) => {
        if (text.length < LONGUEUR_MIN_TITRE) {
            console.warn(`Le titre doit contenir au moins ${LONGUEUR_MIN_TITRE} caractères.`);
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
            setTitre(texte);
        }
    };

    const validerContenu = (texte: string) => {
        if (validateContent(texte)) {
            setContenu(texte);
        }
    };
    const gererNavigation = useCallback(() => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'ListePublicationsScreen' }],
            })
        );
    }, [navigation]);

    const soumettre = async (
        publication: any,
        fileInfo: { uri: string | null; type: string | null; name: string | null; size: number | null } | null,
      ) => {
        try {
          let pieceJointeId: number | null = null;
          if (fileInfo && fileInfo.uri) {
            const formDataPieceJointe = new FormData();
            formDataPieceJointe.append('idUtilisateur', publication.Utilisateur);
            formDataPieceJointe.append('type', fileInfo.type ?? '');
            formDataPieceJointe.append('titre', fileInfo.name ?? '');
            formDataPieceJointe.append('description', 'Description de la pièce jointe');
            
            const pieceJointeResponse = await PublicationService.AjouterPieceJointe(formDataPieceJointe, fileInfo);
            console.log('Piece jointe:', pieceJointeResponse);
            if (pieceJointeResponse?.data?.id) {
              pieceJointeId = pieceJointeResponse.data.id;
              console.log('Piece jointe ID:', pieceJointeId);
            } else {
              console.error('Erreur lors de l\'ajout de la pièce jointe');
            }
          }
          const formDataPublication = new FormData();
          formDataPublication.append("titre", publication.titre);
          formDataPublication.append("contenu", publication.contenu);
          formDataPublication.append("idUtilisateur", publication.Utilisateur);
          formDataPublication.append("idCategorie", publication.Categorie);
          if (publication.lienPieceJointe) {
            formDataPublication.append("lienPieceJointe", publication.lienPieceJointe);
          }
          if (pieceJointeId) {
            formDataPublication.append("idPieceJointe", pieceJointeId.toString());
          }
      
          console.log(formDataPublication);
      
          const response = await PublicationService.CreerPublication(formDataPublication);
          console.log("Response:", response);
          if (response) {
            gererNavigation();
          } else {
            console.error(
              "Erreur lors de la création de la publication. Veuillez vérifier la réponse du serveur."
            );
          }
        } catch (error: any) {
          console.error("Erreur lors de la soumission de la publication:", error.message);
        }
      };
      
      






    const selectionnerPieceJointe = async () => {
        try {
            const result = (await DocumentPicker.pickMultiple({
                type: [
                    DocumentPicker.types.images,
                    DocumentPicker.types.video,
                    DocumentPicker.types.pdf,
                ],
            }))[0];
            console.log('Fichier sélectionné:', result);
    
            const androidContentUri = result.uri.startsWith('content://');
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
                console.log('Annulation du choix de fichier');
            } else {
                throw err;
            }
        }
    };
    
      
      
      
      
    const renderPieceJointe = () => {
        if (!fileInfo || fileInfo.uri === null || !fileInfo.hasOwnProperty('type') || !fileInfo.type) {
            return <Text>Type de fichier non pris en charge</Text>;
        }
        const typeMime = fileInfo.type;
      
        const uri =
          Platform.OS === 'android'
            ? 'file://' + fileInfo.uri
            : fileInfo.uri.replace('file://', '');
      
        if (typeMime.startsWith('image/')) {
          return <Image source={{ uri }} style={styles.imagePieceJointe} />;
        } else if (typeMime.startsWith('video/')) {
          return (
            <WebView
              source={{ uri }}
              style={styles.videoPieceJointe}
              allowsFullscreenVideo={true}
              javaScriptEnabled={true}
              mediaPlaybackRequiresUserAction={false}
            />
          );
        } else if (typeMime === 'application/pdf') {
          return <Pdf source={{ uri }} style={styles.pdfPieceJointe} />;
        } else {
          return <Text>Type de fichier non pris en charge</Text>;
        }
      };
      
      



    return (
        <ScrollView style={styles.conteneur}>
            <TextInput
                label="Titre"
                value={titre}
                onChangeText={gererChangementTitre}
                style={styles.input}
            />
            <TextInput
                label="Contenu"
                value={contenu}
                onChangeText={validerContenu}
                style={styles.input}
                multiline
                numberOfLines={4}
            />
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
    onPress={() =>
        soumettre(
            {
                titre,
                contenu,
                Categorie,
                Utilisateur,
                lienPieceJointe,
            },
            fileInfo.type
                ? {
                      uri: fileInfo.uri ?? '',
                      type: fileInfo.type ?? '',
                      name: fileInfo.name ?? '',
                      size: fileInfo.size ?? 0,
                  }
                : null
        )
    }
    style={styles.boutonSoumettre}
    disabled={titre.length < LONGUEUR_MIN_TITRE || contenu.length === 0}
>
    Créer la publication
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
    },
    boutonSoumettre: {
        marginTop: 16,
    },
    boutonSelectionFichier: {
        marginBottom: 16,
    },
    previewPieceJointe: {
        alignItems: 'center',
        marginVertical: 16,
    },
    titrePieceJointe: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8,
    },
    imagePieceJointe: {
        width: '100%',
        height: 250,
        resizeMode: 'contain',
        marginBottom: 16,
    },
    videoPieceJointe: {
        width: '100%',
        height: 250,
        marginBottom: 16,
    },
    pdfPieceJointe: {
        width: '100%',
        height: 250,
        marginBottom: 16,
    },
});