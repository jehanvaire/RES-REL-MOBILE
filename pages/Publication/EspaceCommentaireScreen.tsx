import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import CommentaireService from "../../services/CommentaireService";

function EspaceCommentaireScreen(props: any) {
  const [listeCommentaires, setListeCommentaires] = useState<
    CommentaireEntity[]
  >([]);
  const { id } = props.route.params;

  useEffect(() => {
    const params = {
      "idRessource[equals]=": id,
    };
    CommentaireService.GetCommentairePourUneRessource(params).then(
      (commentaires: CommentaireEntity[]) => {
        setListeCommentaires(commentaires);
        console.log(commentaires.length);
      }
    );
  }, []);

  const renderItem = ({ item }: any) => (
    <View key={item.id}>
      <View>
        <Text style={styles.contenuCommentaire}>{item.contenu}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EspaceCommentaireScreen {id} a</Text>

      <FlatList
        data={listeCommentaires}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      ></FlatList>
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
  contenuCommentaire: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});

export default EspaceCommentaireScreen;
