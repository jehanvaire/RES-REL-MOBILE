import { Spacer, Stack, FlatList, Avatar } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { View } from "native-base";
import { UtilisateurEntity } from "../../ressources/types/UtilisateurEntity";
import { AuthentificationEnum } from "../../ressources/enums/AuthentificationEnum";
import { storage } from "../../services/AuthentificationService";
import SearchService from "../../services/SearchService";
import { PublicationEntity } from "../../ressources/types/PublicationEntity";

const PER_PAGE = 15;

function RechercheUtilisateurScreen(props: any) {
  const [utilisateur, setUtilisateur] = useState<UtilisateurEntity>(
    {} as UtilisateurEntity
  );
  const [listeResultats, setListeResultats] = useState<any[]>([]);

  useEffect(() => {
    var user_json = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";

    var user = JSON.parse(user_json) as UtilisateurEntity;
    setUtilisateur(user);

    SearchService.GetListeResultats().subscribe((result) => {
      if (result !== undefined) {
        result = result.filter((item) => item.mail);
        setListeResultats(result);
      } else {
        setListeResultats([]);
      }
    });
  }, []);

  function AfficherUtilisateur(publication: PublicationEntity) {
    props.navigation.navigate("DetailsUtilisateur", {
      auteur: publication.auteur,
      titre: publication.titre,
      contenu: publication.contenu,
      status: publication.status,
      raisonRefus: publication.raisonRefus,
      dateCreation: publication.dateCreation,
      lienImage: publication.lienImage,
    });
  }

  const renderItem = useCallback(
    ({ item }: any) => (
      <TouchableOpacity
        key={item.id}
        onPress={() => {
          AfficherUtilisateur(item);
        }}
      >
        {item.mail ? (
          <Stack style={styles.utilisateurPreview} direction="row">
            <Avatar
              style={styles.avatar}
              source={{
                uri: item.cheminPhoto,
              }}
            ></Avatar>
            <Text style={styles.nomPrenom}>
              {item.prenom} {item.nom}
            </Text>
            <Spacer />
          </Stack>
        ) : null}
      </TouchableOpacity>
    ),
    []
  );

  return (
    <View style={styles.container}>
      {listeResultats.length > 0 ? (
        <>
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
        </>
      ) : (
        <View>
          <Text>Effectuez une recherche pour trouver d'autres citoyens</Text>
        </View>
      )}
    </View>
  );
}

export default RechercheUtilisateurScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  utilisateurPreview: {
    backgroundColor: "white",
    height: 70,
    width: "100%",
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  nomPrenom: {
    fontSize: 20,
    marginVertical: 15,
    marginHorizontal: 10,
  },
  avatar: {
    marginLeft: 10,
  },
});
