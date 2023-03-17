import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

function CreationPublicationScreen() {
    const [auteur, setAuteur] = useState('');
    const [titre, setTitre] = useState('');
    const [contenu, setContenu] = useState('');
    const [lienImage, setLienImage] = useState('');

    const MIN_TITLE_LENGTH = 5;

    const handleTitleChange = (text:any) => {
        if (text.length < MIN_TITLE_LENGTH) {
            console.warn(`Le titre doit contenir au moins ${MIN_TITLE_LENGTH} caractères.`);
        }
        setTitre(text);
    };

    const validateAuteur = (text:any) => {
        if (text.length > 0) {
            setAuteur(text);
        } else {
            console.warn("Le champ auteur ne doit pas être vide.");
        }
    };

    const validateContenu = (text:any) => {
        if (text.length > 0) {
            setContenu(text);
        } else {
            console.warn("Le champ contenu ne doit pas être vide.");
        }
    };

    const validateLienImage = (text:any) => {
        if (text.length > 0) {
            setLienImage(text);
        } else {
            console.warn("Le champ lien de l'image ne doit pas être vide.");
        }
    };

    const handleSubmit = () => {
        // Traitez les données du formulaire ici
        console.log({
            auteur,
            titre,
            contenu,
            lienImage,
            // ...autres propriétés de la publication
        });
    };

    return (
        <ScrollView style={styles.container}>
            <TextInput
                label="Auteur"
                value={auteur}
                onChangeText={validateAuteur}
                style={styles.input}
            />
            <TextInput
                label="Titre"
                value={titre}
                onChangeText={handleTitleChange}
                style={styles.input}
            />
            <TextInput
                label="Contenu"
                value={contenu}
                onChangeText={validateContenu}
                style={styles.input}
                multiline
                numberOfLines={4}
            />
            <TextInput
                label="Lien de l'image"
                value={lienImage}
                onChangeText={validateLienImage}
                style={styles.input}
            />
            <Button mode="contained" onPress={handleSubmit}
                style={styles.submitButton}>
                Créer la publication
            </Button>
        </ScrollView>
    );
}

export default CreationPublicationScreen;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    input: {
        marginBottom: 16,
    },
    submitButton: {
        marginTop: 16,
    },
});
