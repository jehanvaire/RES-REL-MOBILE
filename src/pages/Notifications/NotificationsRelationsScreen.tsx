import { Spacer, FlatList, Stack } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { View } from "native-base";
import { UtilisateurEntity } from "../../ressources/models/UtilisateurEntity";
import { AuthentificationEnum } from "../../ressources/enums/AuthentificationEnum";
import { storage } from "../../services/AuthentificationService";
import RelationService from "../../services/RelationService";
import FastImage from "react-native-fast-image";
import Ionicons from "react-native-vector-icons/Ionicons";

const PER_PAGE = 15;
const utilisateurImageURL = "https://api.victor-gombert.fr/api/v1/utilisateurs";

const NotificationsRelationsScreen = (props: any) => {
  const [utilisateur, setUtilisateur] = useState<UtilisateurEntity>(
    {} as UtilisateurEntity
  );
  const [demandesRelations, setDemandesRelations] = useState<any[]>([]);

  useEffect(() => {
    var user_json = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";

    var user = JSON.parse(user_json) as UtilisateurEntity;
    setUtilisateur(user);

    const params = {
      "idReceveur[equals]=": user.id,
      accepte: null,
      include: "typeRelation,demandeur",
    };

    RelationService.GetRelations(params).then((relations) => {
      setDemandesRelations(relations);
    });
  }, []);

  const GererDemandeRelation = (idDemande: number, accepte: boolean) => {
    const params = {
      accepte: accepte,
    };

    // RelationService.UpdateRelation(idDemande, params).then((relation) => {
    //   console.log(relation);
    // });
  };

  function AfficherUtilisateur(utilisateurSelectionne: UtilisateurEntity) {
    props.navigation.navigate("DetailsAutreUtilisateurRelation", {
      utilisateur: utilisateurSelectionne,
    });
  }

  const renderItem = useCallback(
    ({ item }: any) => (
      <View style={[styles.demandeRelation, styles.shadow]}>
        <TouchableOpacity
          onPress={() => {
            AfficherUtilisateur(item.demandeur);
          }}
        >
          <Stack direction="row" alignItems="center">
            <FastImage
              style={styles.avatar}
              source={{
                uri:
                  utilisateurImageURL +
                  "/" +
                  item.idDemandeur +
                  "/download?getThumbnail=true",
              }}
            />
            <Text style={styles.texteDemande}>
              <Text style={styles.nomUtilisateur}>
                {item.demandeur?.prenom} {item.demandeur?.nom}
              </Text>{" "}
              vous a envoyé une demande de relation de type{" "}
              <Text style={styles.nomUtilisateur}>
                {item.typeRelation?.nom}
              </Text>
            </Text>

            <TouchableOpacity
              style={styles.bouton}
              onPress={() => {
                GererDemandeRelation(item.id, true);
              }}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={30}
                color="#00FF00"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bouton}
              onPress={() => {
                GererDemandeRelation(item.id, false);
              }}
            >
              <Ionicons name="close-circle-outline" size={30} color="#FF0000" />
            </TouchableOpacity>
          </Stack>
        </TouchableOpacity>
      </View>
    ),
    []
  );

  return (
    <View style={styles.container}>
      {demandesRelations.length === 0 ? (
        <Text>Aucune demande pour le moment :(</Text>
      ) : (
        <>
          <FlatList
            style={{ width: "100%" }}
            removeClippedSubviews={true}
            maxToRenderPerBatch={PER_PAGE}
            initialNumToRender={PER_PAGE}
            data={demandesRelations}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.id.toString()}
          />
          <Spacer />
        </>
      )}
    </View>
  );
};

export default NotificationsRelationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#BBBBBB",
  },
  demandeRelation: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    width: "100%",
    marginVertical: 5,
    borderRadius: 10,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  nomUtilisateur: {
    fontWeight: "bold",
  },
  texteDemande: {
    flex: 1,
    flexWrap: "wrap",
  },
  bouton: {
    marginLeft: 10,
  },
});
