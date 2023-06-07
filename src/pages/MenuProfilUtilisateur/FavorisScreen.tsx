import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import { storage } from "../../services/AuthentificationService";
import { AuthentificationEnum } from "../../ressources/enums/AuthentificationEnum";
import { UtilisateurEntity } from "../../ressources/models/UtilisateurEntity";
import { Spacer, Stack } from "native-base";
import PublicationService from "../../services/PublicationService";
import { PublicationEntity } from "../../ressources/models/PublicationEntity";
import FastImage from "react-native-fast-image";


const PER_PAGE = 15;
const piecesJointesURL = "https://api.victor-gombert.fr/api/v1/piecesJointes";

const FavorisScreen = ({ navigation }: any) => {

  const [utilisateur, setUtilisateur] = useState<UtilisateurEntity>({} as UtilisateurEntity);
  const [publicationsFavorites, setPublicationsFavorites] = useState<PublicationEntity[]>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Favoris',
    });
  }, [navigation]);

  function AfficherPublication(publication: PublicationEntity) {
    console.log(publication);
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
    });
  }

  useEffect(() => {
    const utilisateurJson = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";
    const utilisateurObject = JSON.parse(utilisateurJson) as UtilisateurEntity;
    setUtilisateur(utilisateurObject);
  }, []);

  useEffect(() => {
    if (utilisateur.id) {
      getLikes();
    }
  }, [utilisateur.id]);

  async function getLikes() {
    const params = {
      "idUtilisateur[equals]=": utilisateur.id,
    };

    const ressourcesFav = await PublicationService.GetFavorisFromPublication(params);

    const listePublicationsFavorites = [] as PublicationEntity[];

    await Promise.all(
      ressourcesFav.map(async (ressource: any) => {
        const paramsFavoris = {
          "id[equals]=": ressource.id,
          include: "pieceJointe,utilisateur,categorie",
        };

        const publication = await PublicationService.GetPublications(paramsFavoris);

        listePublicationsFavorites.push(publication[0]);
      })
    );

    console.log(listePublicationsFavorites);
    setPublicationsFavorites(listePublicationsFavorites);
  }


  // const groupBy = (array: PublicationEntity[], key: (item: PublicationEntity) => string) => {
  //   return array.reduce((result, currentItem) => {
  //     const keyValue = key(currentItem);
  //     (result[keyValue] = result[keyValue] || []).push(currentItem);
  //     return result;
  //   }, {} as Record<string, PublicationEntity[]>);
  // };

  // const goupAndSortLikes = (array: PublicationEntity[]) => {
  //   const grouped = groupBy(array, (notification: { date: { toDateString: () => string; }; }) => {
  //     const today = new Date();
  //     const yesterday = new Date(today);
  //     yesterday.setDate(yesterday.getDate() - 1);
  //     const isToday = notification.date.toDateString() === today.toDateString();
  //     const isYesterday = notification.date.toDateString() === yesterday.toDateString();

  //     if (isToday) return "Aujourd'hui";
  //     if (isYesterday) return "Hier";
  //     return "Il y a plus longtemps";
  //   });

  //   return Object.keys(grouped)
  //     .sort((groupA, groupB) => {
  //       if (groupA === "Aujourd'hui") return -1;
  //       if (groupA === "Hier" && groupB !== "Aujourd'hui") return -1;
  //       if (groupA === "Il y a plus longtemps") return 1;
  //       return 0;
  //     })
  //     .reduce((acc, key) => {
  //       acc[key] = grouped[key];
  //       return acc;
  //     }, {} as Record<string, PublicationEntity[]>);
  // };

  // const sortedGroupedFavori = goupAndSortLikes(publicationsFavorites);
  // const getFormattedDate = (date: Date) => {
  //   const now = new Date();
  //   const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  //   const diffInMinutes = Math.floor(diffInSeconds / 60);
  //   const diffInHours = Math.floor(diffInSeconds / 3600);
  //   const diffInDays = Math.floor(diffInSeconds / 86400);

  //   if (diffInMinutes < 1) return "à l'instant";
  //   if (diffInMinutes === 1) return "il y a 1 minute";
  //   if (diffInMinutes < 60) return `il y a ${diffInMinutes} minutes`;
  //   if (diffInHours === 1) return "il y a 1 heure";
  //   if (diffInHours < 24) return `il y a ${diffInHours} heures`;
  //   if (diffInDays === 1) return "hier";
  //   return `le ${date.toLocaleDateString()}`;
  // };
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
                uri: piecesJointesURL + "/" + item.idPieceJointe + "/download",
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
      {publicationsFavorites.length === 0 ? (
        <Text>Aucun favori trouvé</Text>
      ) : (
        <>
          <FlatList
            style={{ width: "100%" }}
            removeClippedSubviews={true}
            maxToRenderPerBatch={PER_PAGE}
            initialNumToRender={PER_PAGE}
            data={publicationsFavorites}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.id.toString()}
          />
          <Spacer />
        </>
      )}
    </View>
  );
}
export default FavorisScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bbbbbb',
  },
  header: {
    height: 60,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    flex: 1,
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    marginLeft: 16,
  },
  FavoriContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  FavoriImage: {
    width: 75,
    height: 75,
    borderRadius: 10,
    marginRight: 10,
  },
  FavoriTextContainer: {
    flex: 1,
  },
  FavoriTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  FavoriDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  FavoriTime: {
    fontSize: 12,
    color: '#999',
    alignSelf: 'flex-end',
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