import { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { storage } from "../../services/AuthentificationService";
import { AuthentificationEnum } from "../../ressources/enums/AuthentificationEnum";
import { UtilisateurEntity } from "../../ressources/models/UtilisateurEntity";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "native-base";
import axios from "axios";
import RestClient from "../../services/RestClient";
import PublicationService from "../../services/PublicationService";
import ProfilStackNavigator from "../../components/Navigators/ProfilStackNavigator";
import { LikeEntity } from "../../ressources/models/LikeEntity";


interface FavorisScreenProps {
  navigation: any;
}

const FavorisScreen = ({ navigation }: FavorisScreenProps) => {

  const likesApiUrl = "https://api.victor-gombert.fr/api/v1/favoris";
  const [token, setToken] = useState<string>("");
  const [utilisateur, setUtilisateur] = useState<UtilisateurEntity>({} as UtilisateurEntity);
  const PER_PAGE = 15;
  const [items, setItems] = useState<LikeEntity[]>([]);

  const restClient = new RestClient();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Favoris',
    });
  }, [navigation]);
  
  const handlePublicationClick = (idPublication: number) => {
    // Rediriger vers la page de la publication concernée
    navigation.navigate("DetailsPublication", { id: idPublication });
  };
  
  useEffect(() => {
    const utilisateurJson = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";
    const utilisateurObject = JSON.parse(utilisateurJson) as UtilisateurEntity;
    setUtilisateur(utilisateurObject);
  
    const token = storage.getString(AuthentificationEnum.ACCESS_TOKEN_KEY) ?? "";
    setToken(token);
  
    console.log(utilisateurObject.id);
    getLikes();
  }, [utilisateur.id]);

  async function getLikes() {
    if (!utilisateur.id) {
      return;
    }
  
    // get likes from current user
    try {
      const params = {
        "idUtilisateur[equals]=": utilisateur.id,
      };
  
      const likes = await PublicationService.GetFavorisFromPublication(params);
      console.log(likes);
  
      // Fetch details of each liked publication
      const likeItems: LikeEntity[] = [];
  
      for (let i = 0; i < likes.data.length; i++) {
        const like = likes.data[i];
        const publication = await PublicationService.GetPublications(
          { "id[equals]": like.idRessource }
        );
  
        // Vérifier si la publication a été mise en favori par l'utilisateur courant
        if (like.idUtilisateur === utilisateur.id) {
          likeItems.push({
            id: like.id,
            title: publication[0].titre,
            contenu: publication[0].contenu,
            date: new Date(like.dateFav),
            image: publication[0].image,
          });
        }
      }
  
      setItems(likeItems);
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  }


  const groupBy = (array: LikeEntity[], key: (item: LikeEntity) => string) => {
    return array.reduce((result, currentItem) => {
      const keyValue = key(currentItem);
      (result[keyValue] = result[keyValue] || []).push(currentItem);
      return result;
    }, {} as Record<string, LikeEntity[]>);
  };

  const goupAndSortLikes = (array: LikeEntity[]) => {
    const grouped = groupBy(array, (notification: { date: { toDateString: () => string; }; }) => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const isToday = notification.date.toDateString() === today.toDateString();
      const isYesterday = notification.date.toDateString() === yesterday.toDateString();

      if (isToday) return "Aujourd'hui";
      if (isYesterday) return "Hier";
      return "Il y a plus longtemps";
    });

    return Object.keys(grouped)
      .sort((groupA, groupB) => {
        if (groupA === "Aujourd'hui") return -1;
        if (groupA === "Hier" && groupB !== "Aujourd'hui") return -1;
        if (groupA === "Il y a plus longtemps") return 1;
        return 0;
      })
      .reduce((acc, key) => {
        acc[key] = grouped[key];
        return acc;
      }, {} as Record<string, LikeEntity[]>);
  };

  const sortedGroupedNotifications = goupAndSortLikes(items);
  const getFormattedDate = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInSeconds / 3600);
    const diffInDays = Math.floor(diffInSeconds / 86400);

    if (diffInMinutes < 1) return "à l'instant";
    if (diffInMinutes === 1) return "il y a 1 minute";
    if (diffInMinutes < 60) return `il y a ${diffInMinutes} minutes`;
    if (diffInHours === 1) return "il y a 1 heure";
    if (diffInHours < 24) return `il y a ${diffInHours} heures`;
    if (diffInDays === 1) return "hier";
    return `le ${date.toLocaleDateString()}`;
  };
  return (
    <ScrollView style={styles.container}>
      {

  Object.entries(sortedGroupedNotifications).map(([group, notifications]: [string, LikeEntity[]]) => (
    <View key={group}>
      <Text style={styles.dateHeader}>{group}</Text>
      {notifications.map((notification) => (
        <TouchableOpacity
          key={notification.id}
          style={styles.notificationContainer}
          onPress={() => handlePublicationClick(notification.id)}
        >
          <Image
            source={{ uri: notification.image }}
            style={styles.notificationImage}
          />
          <View style={styles.notificationTextContainer}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            <Text style={styles.notificationDescription}>
              {notification.contenu.slice(0, 100)}...
            </Text>
            <Text style={styles.notificationTime}>
              {getFormattedDate(notification.date)}
            </Text>
          </View>
        </TouchableOpacity>
      ))}

      </View>
  ))}

    </ScrollView>
  );
};

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
  notificationContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  notificationImage: {
    width: 75,
    height: 75,
    borderRadius: 10,
    marginRight: 10,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  notificationDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
    alignSelf: 'flex-end',
  },
});