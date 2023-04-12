import React, { useState, useCallback } from 'react';
import { ScrollView, StyleSheet, View, Image, Text, Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Video from 'react-native-video';
import Pdf from 'react-native-pdf';
import { useNavigation, CommonActions } from '@react-navigation/native';
import PublicationService from '../../services/PublicationService';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
// import { FileSystem } from 'react-native-unimodules';



function CreationPublicationScreen() {
    const navigation = useNavigation();
    const [titre, setTitre] = useState('');
    const [contenu, setContenu] = useState('');
    const [lienPieceJointe, setLienPieceJointe] = useState('');
    const [fileInfo, setFileInfo] = useState<{
        uri: string;
        type: string;
        name: string;
        size: number;
    }>({
        uri: '',
        type: '',
        name: '',
        size: 0,
    });

    const [Utilisateur] = useState('1050');
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
        fileInfo: { uri: string; type: string; name: string; size: number } | null,
    ) => {
        try {
            let pieceJointeId: number | null = null;
            if (fileInfo && fileInfo.uri) {
                // Copy the file to an accessible location
                const accessibleFileUri = RNFS.CachesDirectoryPath + '/' + fileInfo.name;
                await RNFS.copyFile(fileInfo.uri, accessibleFileUri);

                // Read the file with RNFetchBlob
                const data = await RNFetchBlob.fs.readFile(accessibleFileUri, 'base64');

                const formDataPieceJointe = new FormData();
                formDataPieceJointe.append('file', `data:${fileInfo.type};base64,${data}`);
                formDataPieceJointe.append('idUtilisateur', publication.Utilisateur);
                formDataPieceJointe.append('typeFichier', fileInfo.type);
                formDataPieceJointe.append('nomFichier', fileInfo.name);
                formDataPieceJointe.append('tailleFichier', fileInfo.size.toString());
                formDataPieceJointe.append('dateCreation', new Date().toISOString());

                const pieceJointeResponse = await PublicationService.AjouterPieceJointe(formDataPieceJointe);
                console.log('Piece jointe:', pieceJointeResponse);
                if (pieceJointeResponse?.data?.id) {
                    pieceJointeId = pieceJointeResponse.data.id;
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
            const result = await DocumentPicker.pick({
                type: [
                    DocumentPicker.types.images,
                    DocumentPicker.types.video,
                    DocumentPicker.types.pdf,
                ],
            }) as unknown as DocumentPickerResponse;

            console.log('Fichier sélectionné:', result);

            const tempPath = `${RNFS.TemporaryDirectoryPath}/${result.name}`;
            await RNFS.copyFile(result.uri, tempPath);

            setLienPieceJointe(tempPath);
            setFileInfo({
                uri: tempPath,
                type: result.type || '',
                name: result.name || '',
                size: result.size || 0,
            });
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // L'utilisateur a annulé la sélection de fichier
            } else {
                throw err;
            }
        }
    };

    const renderPieceJointe = () => {
        if (!fileInfo || !fileInfo.hasOwnProperty('type')) {
            return <Text>Type de fichier non pris en charge</Text>;
        }
        const typeMime = fileInfo.type;

        const uri =
            Platform.OS === 'android' ? fileInfo.uri : fileInfo.uri.replace('file://', '');

        if (typeMime.startsWith('image/')) {
            return <Image source={{ uri }} style={styles.imagePieceJointe} />;
        } else if (typeMime.startsWith('video/')) {
            return (
                <Video
                    source={{ uri }}
                    style={styles.videoPieceJointe}
                    resizeMode="contain"
                    controls
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
                        fileInfo.type ? fileInfo : null
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