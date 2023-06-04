import {
    Stack,
    Spacer,
    Center,
    Text,
    Modal,
    FormControl,
    Button,
    TextArea,
} from "native-base";
import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { PublicationEntity } from "../../ressources/models/PublicationEntity";
import { LikeEntity } from "../../ressources/models/LikeEntity";
import FastImage from "react-native-fast-image";

function FavorisComponent({ publication, navigation }: any) {
    const [showModal, setShowModal] = React.useState(false);
    const [raisonRefus, setRaisonRefus] = React.useState("");
    const [validation, setValidation] = React.useState(false);

    function AfficherPublication(publication: PublicationEntity) {
        navigation.navigate("DetailsPublication", {
            id: publication.id,
            titre: publication.titre,
            contenu: publication.contenu,
            status: publication.status,
            raisonRefus: publication.raisonRefus,
            dateCreation: publication.dateCreation,
            datePublication: publication.datePublication,
            idPieceJointe: publication.idPieceJointe,
            typePj: publication.pieceJointe.type,
            lienImage: publication.image,
            categorie: publication.categorie.nom,
            idUtilisateur: publication.idUtilisateur,
            auteur:
                publication.utilisateur.nom + " " + publication.utilisateur.prenom,
            codePostalActivite: publication.pieceJointe.codePostal,
            lieuActivite: publication.pieceJointe.lieu,
        });
    }
    return (
        <View key={publication.id}>
            <Text style={styles.dateHeader}>{publication.dateCreation}</Text>
            <Text></Text>
            {publication.map((item: LikeEntity) => (
                <View key={item.id} style={styles.notificationContainer}>
                    {item.image !== "" ? (
                        <FastImage
                            style={styles.notificationImage}
                            source={{ uri: item.image }}
                        />) : null
                    }
                    <View style={styles.notificationTextContainer}>
                        <Text style={styles.notificationTitle}>{item.title}</Text>
                        <Text style={styles.notificationDescription}>
                            {item.contenu}
                        </Text>
                        <Text style={styles.notificationTime}>
                            {getFormattedDate(item.date)}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    );
}
export default FavorisComponent;

const styles = StyleSheet.create({
    bouton: {
        borderRadius: 10,
        width: "40%",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
    },
    publicationPreviewContainer: {
        backgroundColor: "white",
        marginBottom: 10,
        borderRadius: 10,
    },
    validation: {
        backgroundColor: "#E5E5E5",
    },
    publicationPreview: {
        height: 50,
        width: "100%",
        borderRadius: 10,
        padding: 10,
    },
    titrePreview: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
    },
    descriptionPreview: {
        fontSize: 15,
        padding: 10,
    },
    textButton: {
        fontSize: 18,
    },
    dateHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 8,
        marginLeft: 16,
    },
    notificationContainer: {
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 10,
        marginBottom: 8,
    },
    notificationImage: {
        width: 75,
        height: 75,
        borderRadius: 10,
        marginRight: 10,
    },
    notificationTextContainer: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 3,
    },
    notificationDescription: {
        fontSize: 14,
        marginBottom: 4,
    },
    notificationTime: {
        fontSize: 12,
        color: '#999',
        alignSelf: 'flex-end',
    },
});
