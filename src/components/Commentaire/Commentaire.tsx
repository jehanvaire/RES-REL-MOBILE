import { TouchableOpacity, Text, StyleSheet } from "react-native";
import CommentaireService from "../../services/CommentaireService";
import { View } from "react-native";

const CommentaireComponent = ({ item, estReponse }: any) => {
  return (
    <TouchableOpacity
      onLongPress={() => {
        CommentaireService.setItemSelectionne(item);
        CommentaireService.setAfficherModalMenu(true);
      }}
    >
      <View style={[styles.container]}>
        <Text
          style={[
            estReponse ? styles.contenuReponse : styles.contenuCommentaire,
            styles.commentaire,
            styles.shadow,
          ]}
        >
          {item.contenu}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CommentaireComponent;

const styles = StyleSheet.create({
  container: {
    overflow: "visible",
  },
  contenuCommentaire: {
    backgroundColor: "#FFFFFF",
    marginLeft: 5,
    marginRight: 5,
  },
  contenuReponse: {
    backgroundColor: "#FFFFFF",
    marginLeft: 30,
    marginRight: 5,
  },
  commentaire: {
    fontSize: 15,
    fontWeight: "bold",
    borderRadius: 10,
    padding: 10,
    margin: 5,
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