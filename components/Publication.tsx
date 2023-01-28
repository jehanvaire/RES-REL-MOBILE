import {
  BookOutlined,
  CommentOutlined,
  EllipsisOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import { Text, Box, Spacer, Center, Stack, Avatar, Image } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Description from "./Description";
import PublicationService from "../services/PublicationService";

function getDiffTime(date: Date) {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (seconds < 60) return seconds + "s";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return minutes + "m";
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + "h";
  const days = Math.floor(hours / 24);
  if (days < 7) return days + " jours";
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return weeks + " semaines";
  const months = Math.floor(days / 30);
  if (months < 12) return months + " mois";
  const years = Math.floor(days / 365);
  if (years < 2) return years + " an";
  return years + " ans";
}

function likePublication() {
  PublicationService.addLikeToPublication(1).then((res) => {
    console.log(res);
  });
}

function showCommentsSection() {
  console.log("TODO: show comments section");
}

function sauvegarderPublication() {
  PublicationService.sauvegarderPublication(1).then((res) => {
    console.log(res);
  });
}

function afficherPlusOptions() {
  console.log("TODO: afficher plus d'options");
}

export default function Publication(props: any) {
  return (
    <Box style={styles.container}>
      {/* Header */}
      <Stack direction="row" style={styles.header}>
        <Avatar
          source={{
            uri: "https://i.imgflip.com/2xc9z0.png",
          }}
        ></Avatar>

        <Center marginLeft={2}>
          <Text>Partagé par {props.auteur}</Text>
        </Center>

        <Spacer />

        <Center>
          <Text>Il y a {getDiffTime(props.dateCreation)}</Text>
        </Center>
      </Stack>

      <Box>
        <Text style={styles.titre}>{props.titre}</Text>
      </Box>

      <Box>
        <Description description={props.description}></Description>
      </Box>

      <Box>
        <Image
          style={styles.image}
          source={{
            uri: props.lienImage,
          }}
          alt={props.titre + " image"}
          size="xl"
        />
      </Box>

      {/* Footer */}
      <Stack direction="row" style={styles.footer}>
        <TouchableOpacity onPress={likePublication}>
          <LikeOutlined style={styles.button} />
        </TouchableOpacity>

        <Spacer />

        <TouchableOpacity onPress={showCommentsSection}>
          <CommentOutlined style={styles.button} />
        </TouchableOpacity>

        <Spacer />

        <TouchableOpacity onPress={sauvegarderPublication}>
          <BookOutlined style={styles.button} />
        </TouchableOpacity>

        <Spacer />

        <TouchableOpacity onPress={afficherPlusOptions}>
          <EllipsisOutlined style={styles.button} />
        </TouchableOpacity>
      </Stack>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "whitesmoke",
    marginVertical: 7,
  },
  header: {
    margin: 10,
    marginTop: 5,
  },
  titre: {
    fontSize: 26,
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 10,
  },
  description: {
    fontSize: 16,
    margin: 10,
  },
  image: {
    marginTop: 10,
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
  button: {
    padding: 5,
    fontSize: 25,
  },
  footer: {
    margin: 20,
    marginVertical: 10,
  },
});
