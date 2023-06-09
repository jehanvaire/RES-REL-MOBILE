import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import CommentaireService from "../../services/CommentaireService";
import CommentaireEntity from "../../ressources/models/CommentaireEntity";
import { Input, Stack, Spacer } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import CommentaireComponent from "../../components/Commentaire/Commentaire";
import ModalOptionsComponent from "../../components/Commentaire/ModalOptionsCommentaire";
import { storage } from "../../services/AuthentificationService";
import { AuthentificationEnum } from "../../ressources/enums/AuthentificationEnum";

function EspaceCommentaireScreen(props: any) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [listeCommentaires, setListeCommentaires] = useState<
    CommentaireEntity[]
  >([]);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: "Commentaires",
    });
  }, [props.navigation]);

  const [reponseA, setReponseA] = useState<CommentaireEntity>(
    {} as CommentaireEntity
  );

  const { id, titre } = props.route.params;

  // Contenu commentaire à envoyer
  const [commentaire, setCommentaire] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const fetchStorage = async () => {
      const user_json =
        storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";
      if (user_json !== "") {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        console.log("Vous n'êtes pas connecté");
      }
    };

    fetchStorage();
  }, []);

  useEffect(() => {
    loadCommentaires();
  }, []);

  useEffect(() => {
    CommentaireService.setReponseACommentaire({} as CommentaireEntity);
    // Récupérer le commentaire sur lequel on répond
    CommentaireService.getReponseACommentaire().subscribe((item) => {
      setReponseA(item);
    });

    CommentaireService.getCommentaireASupprimer().subscribe(() => {
      loadCommentaires();
    });
  }, []);

  function loadCommentaires() {
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
  }

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
      <Text style={[styles.title, styles.shadow]}>{titre}</Text>

      <FlatList
        style={{ width: "100%" }}
        data={listeCommentaires}
        renderItem={renderItem}
        removeClippedSubviews={true}
        keyExtractor={(item) => item.id.toString()}
      ></FlatList>

      <ModalOptionsComponent />

      {isAuthenticated && (
        <>
          {reponseA.id && (
            <Stack direction="row" style={[styles.inputStack, styles.rounded]}>
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
                <Ionicons
                  name="close-circle-outline"
                  size={25}
                  color="#4183F4"
                />
              </TouchableOpacity>
            </Stack>
          )}

          <Stack
            direction="row"
            style={[styles.inputStack, !reponseA.id && styles.rounded]}
          >
            <Input
              mx="3"
              placeholder="Publier un commentaire..."
              w="85%"
              onChangeText={setCommentaire}
              value={commentaire}
              ref={inputRef}
              borderRadius={15}
              borderWidth={1}
              borderColor={"gray"}
              fontSize={15}
              editable={isAuthenticated}
            />
            <TouchableOpacity
              onPress={() => {
                reponseA.id ? sendReponseCommentaire() : sendCommentaire();
              }}
            >
              <Ionicons name="send-outline" size={25} color="#000000" />
            </TouchableOpacity>
          </Stack>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#BBBBBB",
  },
  title: {
    backgroundColor: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: "100%",
  },
  textReponse: {
    marginLeft: 30,
  },
  inputStack: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 75,
    backgroundColor: "#fff",
  },
  rounded: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
});

export default EspaceCommentaireScreen;
