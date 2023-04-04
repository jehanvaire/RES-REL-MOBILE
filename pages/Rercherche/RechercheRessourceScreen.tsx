import { Spacer, Stack, FlatList } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { View } from "native-base";
import { UtilisateurEntity } from "../../ressources/types/UtilisateurEntity";
import { AuthentificationEnum } from "../../ressources/enums/AuthentificationEnum";
import { storage } from "../../services/AuthentificationService";
import PublicationService from "../../services/PublicationService";
import SearchService from "../../services/SearchService";
import { PublicationEntity } from "../../ressources/types/PublicationEntity";
import FastImage from "react-native-fast-image";

const PER_PAGE = 15;

function RessourceSearchScreen(props: any) {
  const [utilisateur, setUtilisateur] = useState<UtilisateurEntity>(
    {} as UtilisateurEntity
  );
  const [searchValue, setSeachValue] = React.useState("");
  const [listeResultats, setListeResultats] = useState<any[]>([]);

  useEffect(() => {
    var user_json = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";

    var user = JSON.parse(user_json) as UtilisateurEntity;
    setUtilisateur(user);

    SearchService.GetListeResultats().subscribe((result) => {
      if (result) {
        result = result.filter((item) => item.titre);
        setListeResultats(result);
      } else {
        setListeResultats([]);
      }
    });
  }, []);

  const startSearch = () => {
    if (searchValue !== "") {
      const params = {
        ressourceQuery: searchValue,
        utilisateurQuery: searchValue,
      };
      SearchService.Search(params).then((result) => {
        result.forEach((element) => {
          console.log(element.titre);
        });
        setListeResultats(result);
      });
    } else {
      PublicationService.GetAllPublications().then((listePublications) => {
        setListeResultats(listePublications);
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startSearch();
    }, 250);

    return () => clearTimeout(timer);
  }, [searchValue]);

  function AfficherPublication(publication: PublicationEntity) {
    props.navigation.navigate("DetailsPublication", {
      auteur: publication.auteur,
      titre: publication.titre,
      contenu: publication.contenu,
      status: publication.status,
      raisonRefus: publication.raisonRefus,
      dateCreation: publication.dateCreation,
      datePublication: publication.datePublication,
      lienImage: publication.lienImage,
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
            <Text style={styles.auteurPrewiew}>Adrien</Text>
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
}

export default RessourceSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  searchStack: {
    backgroundColor: "white",
    height: 50,
    width: "100%",
  },
  textInput: {
    height: 40,
    fontSize: 15,
    paddingLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    width: "75%",
    borderColor: "gray",
    borderWidth: 1,
  },
  searchIcon: {
    color: "black",
    marginTop: 5,
    marginRight: 10,
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