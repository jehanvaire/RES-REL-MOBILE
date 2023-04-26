import { Spacer, Stack, FlatList } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { View } from "native-base";
import { UtilisateurEntity } from "../../ressources/models/UtilisateurEntity";
import { AuthentificationEnum } from "../../ressources/enums/AuthentificationEnum";
import { storage } from "../../services/AuthentificationService";
import { PublicationEntity } from "../../ressources/models/PublicationEntity";
import RechercheService from "../../services/RechercheService";
import FastImage from "react-native-fast-image";

const PER_PAGE = 15;

const RechercheRessourceScreen = (props: any) => {
  const [utilisateur, setUtilisateur] = useState<UtilisateurEntity>(
    {} as UtilisateurEntity
  );
  const [listeResultats, setListeResultats] = useState<any[]>([]);

  useEffect(() => {
    var user_json = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";

    if (user_json !== "") {
      var user = JSON.parse(user_json) as UtilisateurEntity;
      setUtilisateur(user);
    } else {
      setUtilisateur({} as UtilisateurEntity);
    }

    RechercheService.GetListeResRessources().subscribe((result) => {
      if (result) {
        result = result.filter((item) => item.titre);
        setListeResultats(result);
      } else {
        setListeResultats([]);
      }
    });
  }, []);

  function AfficherPublication(publication: PublicationEntity) {
    props.navigation.navigate("DetailsPublication", {
      id: publication.id,
      titre: publication.titre,
      contenu: publication.contenu,
      status: publication.status,
      raisonRefus: publication.raisonRefus,
      dateCreation: publication.dateCreation,
      datePublication: publication.datePublication,
      lienImage: publication.image,
      auteur:
        publication.utilisateur.nom + " " + publication.utilisateur.prenom,
    });
  }

  const renderItem = useCallback(
    ({ item }: any) => (
      <TouchableOpacity
        key={item.id}
        onPress={() => {
          AfficherPublication(item);
        }}
      >
        {item.titre ? (
          <Stack style={styles.publicationPreview} direction="row">
            <Text style={styles.titrePreview}>
              {item.titre.substring(0, 20)}
              {item.titre.length > 20 ? "..." : ""}
            </Text>
            <Spacer />
            <Text style={styles.auteurPrewiew}>
              {item.utilisateur?.nom} {item.utilisateur?.prenom}
            </Text>
            <FastImage
              style={styles.imagePrewiew}
              source={{
                uri: item.lienImage,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </Stack>
        ) : null}
      </TouchableOpacity>
    ),
    []
  );

  return (
    <View style={styles.container}>
      {/* TODO: ajouter un texte "Publications suggérées" si searchValue est vide */}
      <FlatList
        style={{ width: "100%" }}
        removeClippedSubviews={true}
        maxToRenderPerBatch={PER_PAGE}
        initialNumToRender={PER_PAGE}
        data={listeResultats}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id.toString()}
      />
      <Spacer />
    </View>
  );
};

export default RechercheRessourceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#BBBBBB",
  },
  listePublications: {
    padding: 10,
    width: "100%",
  },
  publicationPreview: {
    backgroundColor: "white",
    height: 50,
    width: "100%",
    marginBottom: 10,
    borderRadius: 10,
  },
  titrePreview: {
    fontSize: 18,
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
