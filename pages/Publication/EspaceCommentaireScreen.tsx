import { View, Text, StyleSheet } from "react-native";
import { BehaviorSubject } from "rxjs";

function EspaceCommentaireScreen(props: any) {
  const listeCommenentaires = new BehaviorSubject<CommentaireEntity[]>([]);

  const { id } = props.route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EspaceCommentaireScreen {id} a</Text>
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
});

export default EspaceCommentaireScreen;
