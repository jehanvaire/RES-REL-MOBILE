import { Center, Spacer, Stack, FlatList, Avatar } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { View } from "native-base";
import { UtilisateurEntity } from "../../ressources/types/UtilisateurEntity";
import { AuthentificationEnum } from "../../ressources/enums/AuthentificationEnum";
import { storage } from "../../services/AuthentificationService";
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchService from "../../services/SearchService";
import { PublicationEntity } from "../../ressources/types/PublicationEntity";
import { createStackNavigator } from "@react-navigation/stack";
import DetailsUtilisateur from "../../components/Publication/DetailsUtilisateur";

const PER_PAGE = 15;

const StackNav = createStackNavigator();

function UtilisateurSearchScreen(props: any) {
  const [utilisateur, setUtilisateur] = useState<UtilisateurEntity>(
    {} as UtilisateurEntity
  );
  const [listeResultats, setListeResultats] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

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

  // const handleRefresh = () => {
  //   setRefreshing(true);
  //   const params = { perPage: PER_PAGE };
  //   PublicationService.GetListePublicationsUtilisateur(1, params).then(
  //     (publications) => {
  //       setListeRecherche(publications);
  //     }
  //   );
  //   setRefreshing(false);
  // };

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
            refreshing={refreshing}
            // onRefresh={handleRefresh}
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

const UtilisateurStackNavigator = () => {
  return (
    <StackNav.Navigator initialRouteName="ListeUtilisateurs">
      <StackNav.Screen
        name="ListeUtilisateurs"
        component={UtilisateurSearchScreen}
        options={{ headerShown: false }}
      />
      <StackNav.Screen
        name="DetailsUtilisateur"
        component={DetailsUtilisateur}
        options={{ headerShown: false, title: "" }}
      />
    </StackNav.Navigator>
  );
};

export default UtilisateurStackNavigator;

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
