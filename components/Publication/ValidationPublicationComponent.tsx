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

function ValidationPublicationComponent({ publication, navigation }: any) {
  const [showModal, setShowModal] = React.useState(false);
  function AfficherPublication(publication: PublicationEntity) {
    navigation.navigate("DetailsPublication", {
      auteur: publication.auteur,
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
        <Text style={styles.titrePreview}>
          {publication.titre.substring(0, 20)}
          {publication.titre.length > 20 ? "..." : ""}
        </Text>
        <Spacer />
        <Text style={styles.auteurPrewiew}>Adrien</Text>
        <Image
          style={styles.imagePrewiew}
          source={{
            uri: publication.lienImage,
          }}
          alt={publication.titre + " image"}
          size="xl"
        />
      </Stack>

      <Center>
        <Stack direction="row">
          <TouchableOpacity
            onPress={() => {
              setShowModal(true);
            }}
            style={[styles.bouton, { backgroundColor: "red" }]}
          >
            <Text>Refuser</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              ValiderPublication(publication);
            }}
            style={[styles.bouton, { backgroundColor: "green" }]}
          >
            <Text>Accepter</Text>
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
    backgroundColor: "red",
    borderRadius: 10,
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
  },
  titrePreview: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  auteurPrewiew: {
    fontSize: 15,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 10,
  },
  imagePrewiew: {
    height: 42,
    width: 42,
    borderRadius: 10,
    marginTop: 4,
    marginBottom: 4,
    marginRight: 4,
  },
});
