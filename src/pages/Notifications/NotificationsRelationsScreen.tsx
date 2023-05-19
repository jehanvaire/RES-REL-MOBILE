import { Spacer, FlatList } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { View } from "native-base";
import { UtilisateurEntity } from "../../ressources/models/UtilisateurEntity";
import { AuthentificationEnum } from "../../ressources/enums/AuthentificationEnum";
import { storage } from "../../services/AuthentificationService";
import RelationService from "../../services/RelationService";

const PER_PAGE = 15;

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
      include: "utilisateur",
    };

    RelationService.GetRelations(params).then((relations) => {
      setDemandesRelations(relations);
    });
  }, []);

  const renderItem = useCallback(
    ({ item }: any) => (
      <View style={styles.listePublications}>
        <Text>{item.idDemandeur}</Text>
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
  listePublications: {
    padding: 10,
    width: "100%",
  },
});
