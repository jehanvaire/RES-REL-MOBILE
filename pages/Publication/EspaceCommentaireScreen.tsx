import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import CommentaireService from "../../services/CommentaireService";
import CommentaireEntity from "../../ressources/types/CommentaireEntity";
import { Input, Stack, Spacer } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import CommentaireComponent from "../../components/Commentaire/Commentaire";
import ModalOptionsComponent from "../../components/Commentaire/ModalOptionsCommentaire";

function EspaceCommentaireScreen(props: any) {
  const [listeCommentaires, setListeCommentaires] = useState<
    CommentaireEntity[]
  >([]);

  const [reponseA, setReponseA] = useState<CommentaireEntity>(
    {} as CommentaireEntity
  );

  const [commentaireASupprimer, setCommentaireASupprimer] =
    useState<CommentaireEntity>({} as CommentaireEntity);

  const { id, titre } = props.route.params;

  // Contenu commentaire à envoyer
  const [commentaire, setCommentaire] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const params = {
      "idRessource[equals]=": id,
      include: "utilisateur",
    };
    // Récupérer les commentaires ainsi que leurs réponses
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

  useEffect(() => {
    CommentaireService.setReponseACommentaire({} as CommentaireEntity);
    // Récupérer le commentaire sur lequel on répond
    CommentaireService.getReponseACommentaire().subscribe((item) => {
      setReponseA(item);
    });

    CommentaireService.getCommentaireASupprimer().subscribe((item) => {
      setCommentaireASupprimer(item);
      supprimerCommentaire();
    });
  }, []);

  const supprimerCommentaire = () => {
    let listeCommentairesTemp = listeCommentaires;
    if (commentaireASupprimer.estReponse) {
      const commentaireParent = listeCommentairesTemp.find(
        (commentaire) =>
          commentaire.id === commentaireASupprimer.idCommentaire &&
          !commentaire.estReponse
      );
      console.log(commentaireParent);
      // if (commentaireParent) {
      //   if (commentaireParent.reponses.length > 0) {
      //     commentaireParent.reponses = commentaireParent.reponses.filter(
      //       (reponse) => reponse.id !== commentaireASupprimer.id
      //     );
      //   }
      // }
    }
    // else {
    //   listeCommentairesTemp = listeCommentairesTemp.filter(
    //     (commentaire) => commentaire.id !== commentaireASupprimer.id
    //   );
    // }
    // setListeCommentaires(listeCommentairesTemp);
  };

  // Ajouter le nouveau commentaire à la liste, vider le champ commentaire et fermer le clavier
  const setNouvelleListeCommentaires = (
    nouveauCommentaire: CommentaireEntity
  ) => {
    const listeCommentairesTemp = listeCommentaires;

    if (nouveauCommentaire.estReponse) {
      const commentaireParent = listeCommentairesTemp.find(
        (commentaire) =>
          commentaire.id === nouveauCommentaire.idCommentaire &&
          !commentaire.estReponse
      );
      if (commentaireParent) {
        if (commentaireParent.reponses) {
          commentaireParent.reponses.push(nouveauCommentaire);
        } else {
          commentaireParent.reponses = [nouveauCommentaire];
        }
      }
    } else {
      nouveauCommentaire.reponses = [];
      listeCommentairesTemp.push(nouveauCommentaire);
    }

    setListeCommentaires(listeCommentairesTemp);
    setCommentaire("");
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const sendCommentaire = () => {
    const params = {
      contenu: commentaire,
      idRessource: id,
      idUtilisateur: 1,
    };
    CommentaireService.PostCommentaire(params).then(
      (nouveauCommentaire: CommentaireEntity) => {
        nouveauCommentaire.estReponse = false;
        setNouvelleListeCommentaires(nouveauCommentaire);
      }
    );
  };

  const sendReponseCommentaire = () => {
    const params = {
      contenu: commentaire,
      idCommentaire: reponseA.estReponse ? reponseA.idCommentaire : reponseA.id,
      idUtilisateur: 1,
    };

    CommentaireService.PostReponseCommentaire(params).then(
      (reponse: CommentaireEntity) => {
        reponse.estReponse = true;
        setNouvelleListeCommentaires(reponse);
        setReponseA({} as CommentaireEntity);
      }
    );
  };

  const renderItem = ({ item }: any) => (
    <View key={item.id + "-" + item.estReponse}>
      <CommentaireComponent key={item.id} item={item} estReponse={false} />

      {item.reponses?.map((reponse: CommentaireEntity) => (
        <CommentaireComponent
          key={reponse.id + "-" + reponse.estReponse}
          item={reponse}
          estReponse={true}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{titre}</Text>

      <FlatList
        style={{ width: "100%" }}
        data={listeCommentaires}
        renderItem={renderItem}
        removeClippedSubviews={true}
        keyExtractor={(item) => item.id.toString()}
      ></FlatList>

      <ModalOptionsComponent />

      {reponseA.id && (
        <Stack direction="row" style={styles.inputStack}>
          <Text style={styles.textReponse}>
            Réponse à {reponseA.utilisateur?.prenom} :{" "}
            {reponseA.contenu.substring(0, 20)}
          </Text>
          <Spacer />
          <TouchableOpacity
            onPress={() => {
              CommentaireService.setReponseACommentaire(
                {} as CommentaireEntity
              );
              setReponseA({} as CommentaireEntity);
            }}
          >
            <Ionicons name="close-circle-outline" size={25} color="#4183F4" />
          </TouchableOpacity>
        </Stack>
      )}

      <Stack direction="row" style={styles.inputStack}>
        <Input
          mx="3"
          placeholder="Input"
          w="85%"
          onChangeText={setCommentaire}
          value={commentaire}
          ref={inputRef}
        />
        <TouchableOpacity
          onPress={() => {
            reponseA.id ? sendReponseCommentaire() : sendCommentaire();
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
  textReponse: {
    marginLeft: 30,
  },
  inputStack: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
  },
});

export default EspaceCommentaireScreen;
