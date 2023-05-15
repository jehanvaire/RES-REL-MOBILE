import { Spacer, Stack, FlatList, Avatar } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { View } from "native-base";
import { UtilisateurEntity } from "../../ressources/models/UtilisateurEntity";
import { AuthentificationEnum } from "../../ressources/enums/AuthentificationEnum";
import { storage } from "../../services/AuthentificationService";
import RechercheService from "../../services/RechercheService";

const PER_PAGE = 15;
const apiURL = "https://api.victor-gombert.fr/api/v1/utilisateurs";

const RechercheUtilisateurScreen = (props: any) => {
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

    RechercheService.GetListeResUtilisateurs().subscribe((result) => {
      if (result !== undefined) {
        result = result.filter((item) => item.mail);
        setListeResultats(result);
      } else {
        setListeResultats([]);
      }
    });
  }, []);

  function AfficherUtilisateur(utilisateurSelectionne: UtilisateurEntity) {
    RechercheService.SetAfficheHeader(false);
    props.navigation.navigate("DetailsAutreUtilisateur", {
      utilisateur: utilisateurSelectionne,
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
                uri: apiURL + "/" + item.id + "/download",
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
};

export default RechercheUtilisateurScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#BBBBBB",
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
