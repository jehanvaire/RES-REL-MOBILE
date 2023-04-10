import { TouchableOpacity, Text, StyleSheet } from "react-native";
import CommentaireService from "../../services/CommentaireService";

const CommentaireComponent = ({ item, estReponse }: any) => {
  return (
    <TouchableOpacity
      onLongPress={() => {
        CommentaireService.setItemSelectionne(item);
        CommentaireService.setAfficherModalMenu(true);
      }}
    >
      <Text
        style={[
          estReponse ? styles.contenuReponse : styles.contenuCommentaire,
          styles.commentaire,
        ]}
      >
        {item.contenu}
      </Text>
    </TouchableOpacity>
  );
};

export default CommentaireComponent;

const styles = StyleSheet.create({
  contenuCommentaire: {
    borderColor: "#4183F4",
    backgroundColor: "#4183F4",
    marginLeft: 5,
    marginRight: 5,
  },
  contenuReponse: {
    borderColor: "#FF9393",
    backgroundColor: "#FF9393",
    marginLeft: 30,
    marginRight: 5,
  },
  commentaire: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
