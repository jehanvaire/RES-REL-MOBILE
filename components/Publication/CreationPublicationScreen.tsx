import React, { useState, useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation, CommonActions } from '@react-navigation/native';

function CreationPublicationScreen() {
    const navigation = useNavigation();
    const [auteur, setAuteur] = useState('');
    const [titre, setTitre] = useState('');
    const [contenu, setContenu] = useState('');
    const [lienImage, setLienImage] = useState('');

    const LONGUEUR_MIN_TITRE = 5;

    const gererChangementTitre = (texte: any) => {
        if (texte.length < LONGUEUR_MIN_TITRE) {
            console.warn(`Le titre doit contenir au moins ${LONGUEUR_MIN_TITRE} caractères.`);
        }
        setTitre(texte);
    };

    const validerAuteur = (texte: any) => {
        if (texte.length > 0) {
            setAuteur(texte);
        } else {
            console.warn("Le champ auteur ne doit pas être vide.");
        }
    };

    const validerContenu = (texte: any) => {
        if (texte.length > 0) {
            setContenu(texte);
        } else {
            console.warn("Le champ contenu ne doit pas être vide.");
        }
    };

    const validerLienImage = (texte: any) => {
        if (texte.length > 0) {
            setLienImage(texte);
        } else {
            console.warn("Le champ lien de l'image ne doit pas être vide.");
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

    const soumettre = () => {
        if (auteur.length === 0 || titre.length < LONGUEUR_MIN_TITRE || contenu.length === 0 || lienImage.length === 0) {
            console.warn("Veuillez remplir tous les champs correctement avant de soumettre.");
        } else {
            const envoyerDonnees = async () => {
                try {
                    const reponse = await fetch('https://api.victor-gombert.fr/api/v1/ressources', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            auteur,
                            titre,
                            contenu,
                            lienImage,
                            // ...autres propriétés de la publication
                        }),
                    });

                    if (!reponse.ok) {
                        throw new Error('Échec de la soumission de la publication');
                    }
                    // Appeler la fonction gererNavigation pour réinitialiser la pile de navigation et naviguer vers "ListePublicationsScreen"
                    gererNavigation();
                } catch (erreur) {
                    console.error('Erreur lors de la soumission de la publication:', erreur);
                }
            };

            envoyerDonnees();
        }
    };


    return (
        <ScrollView style={styles.conteneur}>
            <TextInput
                label="Auteur"
                value={auteur}
                onChangeText={validerAuteur}
                style={styles.input}
            />
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
            <TextInput
                label="Lien de l'image"
                value={lienImage}
                onChangeText={validerLienImage}
                style={styles.input}
            />
            <Button mode="contained" onPress={soumettre}
                style={styles.boutonSoumettre}>
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
});
