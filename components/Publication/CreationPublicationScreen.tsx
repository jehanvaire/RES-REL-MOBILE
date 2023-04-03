import React, { useState, useCallback } from 'react';
import { ScrollView, StyleSheet, View, Image, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Video from 'react-native-video';
import Pdf from 'react-native-pdf';
import { useNavigation, CommonActions } from '@react-navigation/native';
import PublicationService from '../../services/PublicationService';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import base64 from 'base64-js';


function CreationPublicationScreen() {
    const navigation = useNavigation();
    const [titre, setTitre] = useState('');
    const [contenu, setContenu] = useState('');
    const [lienPieceJointe, setLienPieceJointe] = useState('');
    const [fileInfo, setFileInfo] = useState<{ uri: string; type: string }>({ uri: '', type: '' });


    const LONGUEUR_MIN_TITRE = 5;

    const validateTitle = (text: string) => {
        if (text.length < LONGUEUR_MIN_TITRE) {
            console.warn(`Le titre doit contenir au moins ${LONGUEUR_MIN_TITRE} caractères.`);
            return false;
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

    const soumettre = async (publication: any, pieceJointe: any) => {
        try {
            const formData = new FormData();
            if (pieceJointe) {
                console.log('pieceJointe', pieceJointe);

                const uri = pieceJointe;
                console.log('uri', uri);

                // Lire le fichier à partir de l'URI
                const fileData = await RNFS.readFile(uri, 'base64');
                console.log('fileData', fileData);

                // Créer un blob à partir des données du fichier
                const blob = new Blob([base64.toByteArray(fileData)], { type: pieceJointe.type });
                console.log('blob', blob)

                formData.append('file', blob, pieceJointe.name);
            }
            console.log('formData 1', formData);
            formData.append('titre', publication.titre);
            formData.append('contenu', publication.contenu);
            console.log('formData 2', formData);
            try {
                const response = await PublicationService.CreerPublication(formData);
                console.log('Server response', response);
                if (typeof response === 'object' && response !== null) {
                    gererNavigation();
                } else {
                    console.error('Erreur lors de la soumission de la publication:', 'Réponse non-JSON reçue du serveur');
                }
            } catch (error: any) {
                console.error('Erreur lors de la soumission de la publication:', error.message);
            }
        } catch (erreur: any) {
            console.error('Erreur lors de la soumission de la publication:', erreur.message);
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
            });
            setLienPieceJointe(result[0].uri);
            setFileInfo({ uri: result[0].uri, type: result[0].type || '' });
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // L'utilisateur a annulé la sélection de fichier
            } else {
                throw err;
            }
        }
    };
    const renderPieceJointe = () => {
        if (!fileInfo || !fileInfo.hasOwnProperty("type")) {
            return <Text>Type de fichier non pris en charge</Text>;
        }
        const typeMime = fileInfo.type;

        if (typeMime.startsWith('image/')) {
            return (
                <Image
                    source={{ uri: fileInfo.uri }}
                    style={styles.imagePieceJointe}
                />
            );
        } else if (typeMime.startsWith('video/')) {
            return (
                <Video
                    source={{ uri: fileInfo.uri }}
                    style={styles.videoPieceJointe}
                    resizeMode="contain"
                    controls
                />
            );
        } else if (typeMime === 'application/pdf') {
            return (
                <Pdf
                    source={{ uri: fileInfo.uri }}
                    style={styles.pdfPieceJointe}
                />
            );
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

            {lienPieceJointe.length > 0 && (
                <View style={styles.previewPieceJointe}>
                    <Text style={styles.titrePieceJointe}>Pièce jointe :</Text>
                    {renderPieceJointe()}
                </View>
            )}


            <Button
                mode="contained"
                onPress={() => soumettre({
                    titre,
                    contenu,
                }, lienPieceJointe)}
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