import { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { storage } from "../../services/AuthentificationService";
import { AuthentificationEnum } from "../../ressources/enums/AuthentificationEnum";
import { UtilisateurEntity } from "../../ressources/models/UtilisateurEntity";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "native-base";
import axios from "axios";
import RestClient from "../../services/RestClient";

const FavorisScreen = () => {

  const likesApiUrl = "https://api.victor-gombert.fr/api/v1/favoris";
  const [token, setToken] = useState<string>("");
  const [utilisateur, setUtilisateur] = useState<UtilisateurEntity>({} as UtilisateurEntity);
  const navigation = useNavigation();
  const PER_PAGE = 15;
  const [items, setItems] = useState<LikeItem[]>([]);

  const restClient = new RestClient();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Favoris',
    });
  }, [navigation]);

  useEffect(() => {
    const utilisateurJson = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";
    const utilisateurObject = JSON.parse(utilisateurJson) as UtilisateurEntity;
    setUtilisateur(utilisateurObject);

    const token = storage.getString(AuthentificationEnum.ACCESS_TOKEN_KEY) ?? "";
    setToken(token);

    getLikes();
  }, []
  );

  async function getLikes() {
    const headers = {
      //Authorization: `Bearer ${token}`,
      //temporary token
      Authorization: `Bearer 80|l08wU0thFCZY78oOLOBSBXaE3tpThJcpnfKmQPdq`,
    };
    const params = {
      page: 1,
      perPage: PER_PAGE,
      "idUtilisateur[equals]=": utilisateur.id,
      include: "ressource",
    };

    try {
      console.log(likesApiUrl, { headers, params });
      const response = await axios.get(likesApiUrl, { headers, params });
      const likes = response.data.data;
      //console.log(likes);

      likes.forEach((like: any) => {
        like.dateFav = like.dateFav.replace(" ", "T");
      });

      const items: LikeItem[] = likes.map((like: any) => ({
        id: like.id,
        title: like.ressource.titre,
        contenu: like.ressource.contenu.slice(0, 50) + "...",
        date: new Date(like.dateFav),
        // image: like.ressource.typeRessource === "IMAGE"
        // ? `https://api.victor-gombert.fr/api/v1/piecesJointes/${like.ressource.idPieceJointe}/download/` 
        // : "", 
        //Check if the ressource is an image or not
        image: `https://api.victor-gombert.fr/api/v1/piecesJointes/${like.ressource.idPieceJointe}/download/`
      }));
      setItems(items);
    } catch (error) {
      console.log(error);
    }
  }

  interface LikeItem {
    id: number;
    title: string;
    contenu: string;
    date: Date;
    image: string;
  }

  const groupBy = (array: LikeItem[], key: (item: LikeItem) => string) => {
    return array.reduce((result, currentItem) => {
      const keyValue = key(currentItem);
      (result[keyValue] = result[keyValue] || []).push(currentItem);
      return result;
    }, {} as Record<string, LikeItem[]>);
  };

  const goupAndSortLikes = (array: LikeItem[]) => {
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
      }, {} as Record<string, LikeItem[]>);
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
      {Object.entries(sortedGroupedNotifications).map(([group, notifications]: [string, LikeItem[]]) => (
        <View key={group}>
          <Text style={styles.dateHeader}>{group}</Text>
          <Text></Text>
          {notifications.map((item: LikeItem) => (
            <View key={item.id} style={styles.notificationContainer}>
              {item.image !== "" ? (
                <Image
                  style={styles.notificationImage}
                  source={{ uri: item.image }}
                />) : null
              }
              <View style={styles.notificationTextContainer}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationDescription}>
                  {item.contenu}
                </Text>
                <Text style={styles.notificationTime}>
                  {getFormattedDate(item.date)}
                </Text>
              </View>
            </View>
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

function slice(contenu: any, arg1: number, arg2: number) {
  throw new Error("Function not implemented.");
}
