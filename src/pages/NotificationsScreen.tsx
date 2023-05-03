import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { AuthentificationEnum } from "../ressources/enums/AuthentificationEnum";
import { storage } from "../services/AuthentificationService";
import { ScrollView } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

export const getNumberOfNotifications = (notifications: any) => {
  let count = 0;
  for (const key in notifications) {
    if (Object.prototype.hasOwnProperty.call(notifications, key)) {
      const element = notifications[key];
      count += element.length;
    }
  }
  return count;
};

const NotificationScreen = (props: any) => {
  const [user_storage, setUserStorage] = useState<any | null>(null);

  // useEffect(() => {
  //   setUserStorage(storage.getString(AuthentificationEnum.CURRENT_USER));
  // }, []);

  interface NotificationItem {
    id: number;
    type: "post" | "friend_request";
    title: string;
    description: string;
    date: Date;
    image: string;
  }

  const items: NotificationItem[] = [
    {
      id: 1,
      type: "post",
      title: "Nouveau commentaire",
      description: "utilisateur 1 a commenté votre publication",
      date: new Date("2023-04-18T12:00:00"),
      image: "https://api.victor-gombert.fr/api/v1/utilisateurs/12/download/",
    },
    {
      id: 2,
      type: "friend_request",
      title: "Nouvelle demande de relation",
      description: "utilisateur 2 veut vous ajouter comme ami",
      date: new Date("2023-04-22T12:00:00"),
      image: "https://api.victor-gombert.fr/api/v1/utilisateurs/13/download/",
    },
    {
      id: 3,
      type: "post",
      title: "Nouveau commentaire",
      description: "utilisateur 3 a commenté votre publication",
      date: new Date("2023-04-24T09:00:00"),
      image: "https://api.victor-gombert.fr/api/v1/utilisateurs/14/download/",
    },
    {
      id: 4,
      type: "friend_request",
      title: "Nouvelle demande de relation",
      description: "utilisateur 4 veut vous ajouter comme ami",
      date: new Date("2023-04-23T12:00:00"),
      image: "https://api.victor-gombert.fr/api/v1/utilisateurs/15/download/",
    },
    {
      id: 5,
      type: "post",
      title: "Nouveau commentaire",
      description: "utilisateur 5 a commenté votre publication",
      date: new Date("2023-04-26T12:00:00"),
      image: "https://api.victor-gombert.fr/api/v1/utilisateurs/16/download/",
    },
    {
      id: 6,
      type: "post",
      title: "Nouveau commentaire",
      description: "utilisateur 6 a commenté votre publication",
      date: new Date("2023-04-27T09:00:00"),
      image: "https://api.victor-gombert.fr/api/v1/utilisateurs/17/download/",
    },
    {
      id: 7,
      type: "friend_request",
      title: "Notification 7",
      description: "Description de la notification 7",
      date: new Date("2023-04-27T09:00:00"),
      image: "https://api.victor-gombert.fr/api/v1/utilisateurs/18/download/",
    },
  ];

  const groupBy = (
    array: NotificationItem[],
    key: (item: NotificationItem) => string
  ) => {
    return array.reduce((result, currentItem) => {
      const keyValue = key(currentItem);
      (result[keyValue] = result[keyValue] || []).push(currentItem);
      return result;
    }, {} as Record<string, NotificationItem[]>);
  };

  const groupAndSortNotifications = (array: NotificationItem[]) => {
    const grouped = groupBy(
      array,
      (notification: { date: { toDateString: () => string } }) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const isToday =
          notification.date.toDateString() === today.toDateString();
        const isYesterday =
          notification.date.toDateString() === yesterday.toDateString();

        if (isToday) return "Aujourd'hui";
        if (isYesterday) return "Hier";
        return "Il y a plus longtemps";
      }
    );

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
      }, {} as Record<string, NotificationItem[]>);
  };

  const sortedGroupedNotifications = groupAndSortNotifications(items);

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
    <>
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Notifications</Text>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.container}>
        {Object.entries(sortedGroupedNotifications).map(
          ([group, notifications]: [string, NotificationItem[]]) => (
            <View key={group}>
              <Text style={styles.dateHeader}>{group}</Text>
              {notifications.map((item: NotificationItem) => (
                <View key={item.id} style={styles.notificationContainer}>
                  <Image
                    style={styles.notificationImage}
                    source={{ uri: item.image }}
                  />
                  <View style={styles.notificationTextContainer}>
                    <Text style={styles.notificationTitle}>{item.title}</Text>
                    <Text style={styles.notificationDescription}>
                      {item.description}
                    </Text>
                    <Text style={styles.notificationTime}>
                      {getFormattedDate(item.date)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )
        )}
      </ScrollView>
    </>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#bbbbbb",
  },
  header: {
    height: 60,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    color: "black",
    textAlign: "center",
    flex: 1,
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
    marginLeft: 16,
  },
  notificationContainer: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 16,
    marginBottom: 8,
  },
  notificationImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: "#999",
    alignSelf: "flex-end",
  },
});
