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
import { TouchableOpacity, StyleSheet } from "react-native";
import { PublicationEntity } from "../../ressources/models/PublicationEntity";
import PublicationService from "../../services/PublicationService";
import moment from "moment";

function ValidationPublicationComponent({ publication, navigation }: any) {
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

  function RefuserPublication(publication: PublicationEntity) {
    const params = {
      id: publication.id,
      raison: raisonRefus,
    };
    setValidation(true);
    PublicationService.RefuserPublication(params).then(() => {
      PublicationService.setRechargerPublications(true);
      setValidation(false);
    });
  }

  function ValiderPublication(publication: PublicationEntity) {
    setValidation(true);
    PublicationService.ValiderPublication(publication.id).then(() => {
      PublicationService.setRechargerPublications(true);
      setValidation(false);
    });
  }

  return (
    <TouchableOpacity
      onPress={() => {
        AfficherPublication(publication);
      }}
      style={styles.publicationPreviewContainer}
    >
      <Stack style={styles.publicationPreview} direction="row">
        {/* TODO: Mettre l'auteur de la publication */}
        <Text>
          {publication.utilisateur.nom} {publication.utilisateur.prenom} -{" "}
          {moment(publication.dateCreation).fromNow()}
        </Text>
        <Spacer />
        {/* TODO: mettre le type de la publication */}
        <Text>Type: {publication.pieceJointe.type}</Text>
      </Stack>

      <Text style={styles.titrePreview} numberOfLines={2}>
        {publication.titre}
      </Text>

      <Text numberOfLines={2} style={styles.descriptionPreview}>
        {publication.contenu}
      </Text>

      <Center>
        <Stack direction="row">
          <TouchableOpacity
            onPress={() => {
              setShowModal(true);
            }}
            disabled={validation}
            style={[
              styles.bouton,
              validation ? styles.validation : { backgroundColor: "#FC754A" },
            ]}
          >
            <Text style={styles.textButton}>Refuser</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              ValiderPublication(publication);
            }}
            disabled={validation}
            style={[
              styles.bouton,
              validation ? styles.validation : { backgroundColor: "#68BE4A" },
            ]}
          >
            <Text style={styles.textButton}>Accepter</Text>
          </TouchableOpacity>
        </Stack>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Indiquer la raison du refus</Modal.Header>
            <Modal.Body>
              <FormControl>
                <TextArea
                  autoCompleteType={undefined}
                  onChangeText={(text) => setRaisonRefus(text)}
                  value={raisonRefus}
                />
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  Annuler
                </Button>
                <Button
                  onPress={() => {
                    RefuserPublication(publication);
                    setShowModal(false);
                  }}
                >
                  Refuser
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    </TouchableOpacity>
  );
}
export default ValidationPublicationComponent;

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
});
