import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import CommentaireService from "../../services/CommentaireService";
import CommentaireEntity from "../../ressources/types/CommentaireEntity";
import { Input, Stack } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

function EspaceCommentaireScreen(props: any) {
  const [listeCommentaires, setListeCommentaires] = useState<
    CommentaireEntity[]
  >([]);
  const { id, titre } = props.route.params;

  const [commentaire, setCommentaire] = useState("");

  useEffect(() => {
    const params = {
      "idRessource[equals]=": id,
      include: "utilisateur",
    };
    CommentaireService.GetCommentairePourUneRessource(params).then(
      (commentaires: CommentaireEntity[]) => {
        const promises = commentaires.map((commentaire) => {
          const paramsReponses = {
            "idCommentaire[equals]=": commentaire.id,
            include: "utilisateur",
          };

          return CommentaireService.GetReponsesPourUnCommentaire(
            paramsReponses
          ).then((reponses: CommentaireEntity[]) => {
            reponses.map((reponse) => {
              reponse.estReponse = true;
            });
            commentaire.reponses = reponses;
            return commentaire;
          });
        });
        Promise.all(promises).then((commentairesAvecReponses) => {
          setListeCommentaires(commentairesAvecReponses);
        });
      }
    );
  }, []);

  const sendCommentaire = () => {
    console.log("onSend", commentaire, id, 1);
    const params = {
      contenu: commentaire,
      idRessource: id,
      idUtilisateur: 1,
    };

    // const params = {
    //   contenu: commentaire,
    //   idCommentaire: id,
    //   idUtilisateur: 1,
    // };
    CommentaireService.PostCommentaire(params).then(
      (commentaire: CommentaireEntity) => {
        const listeCommentairesTemp = listeCommentaires;
        listeCommentairesTemp.push(commentaire);
        setListeCommentaires(listeCommentairesTemp);
      }
    );
  };

  const renderItem = ({ item }: any) => (
    <View key={item.id}>
      <Text style={styles.contenuCommentaire}>{item.contenu} COMMENTAIRE</Text>
      {item.reponses.map((reponse: CommentaireEntity) => (
        <Text key={reponse.id} style={styles.contenuReponse}>
          {reponse.contenu} REPONSE
        </Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{titre}</Text>

      <FlatList
        data={listeCommentaires}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      ></FlatList>

      <Stack direction="row" style={styles.inputStack}>
        <Input
          mx="3"
          placeholder="Input"
          w="85%"
          onChangeText={setCommentaire}
        />
        <TouchableOpacity
          onPress={() => {
            sendCommentaire();
          }}
        >
          <Ionicons name="send-outline" size={25} color="#4183F4" />
        </TouchableOpacity>
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputStack: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
  },
  contenuCommentaire: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginRight: 30,
    marginLeft: 5,
    borderColor: "#4183F4",
    backgroundColor: "#4183F4",
  },
  contenuReponse: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginLeft: 30,
    marginRight: 5,
    borderColor: "#FF9393",
    backgroundColor: "#FF9393",
  },
});

export default EspaceCommentaireScreen;
