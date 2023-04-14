import {
  Stack,
  Spacer,
  Center,
  Text,
  Image,
  Modal,
  FormControl,
  Input,
  Button,
  TextArea,
} from "native-base";
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { PublicationEntity } from "../../ressources/types/PublicationEntity";
import PublicationService from "../../services/PublicationService";
import moment from "moment";

function ValidationPublicationComponent({ publication, navigation }: any) {
  const [showModal, setShowModal] = React.useState(false);
  function AfficherPublication(publication: PublicationEntity) {
    navigation.navigate("DetailsPublication", {
      auteur: publication.utilisateur.nom,
      titre: publication.titre,
      contenu: publication.contenu,
      status: publication.status,
      raisonRefus: publication.raisonRefus,
      dateCreation: publication.dateCreation,
      lienImage: publication.lienImage,
    });
  }

  function RefuserPublication(publication: PublicationEntity) {
    console.log("Refuser", publication);
    PublicationService.RefuserPublication(publication.id);
  }

  function ValiderPublication(publication: PublicationEntity) {
    console.log("Accepter", publication);
    PublicationService.ValiderPublication(publication.id);
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
        <Text>Adrien - {moment(publication.dateCreation).fromNow()}</Text>
        <Spacer />
        {/* TODO: mettre le type de la publication */}
        <Text>Type: Image</Text>
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
            style={[styles.bouton, { backgroundColor: "#FC754A" }]}
          >
            <Text style={styles.textButton}>Refuser</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              ValiderPublication(publication);
            }}
            style={[styles.bouton, { backgroundColor: "#68BE4A" }]}
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
                <TextArea autoCompleteType={undefined} />
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
    // fontWeight: "bold",
  },
});
