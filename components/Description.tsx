import { Box } from "native-base";
import React, { useState } from "react";

import { Text, Button, StyleSheet, ScrollView } from "react-native";

export default function Description(props: any) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Box>
      <Text style={styles.contenu} numberOfLines={expanded ? undefined : 3}>
        {props.contenu}
      </Text>
      {/* show the button only if the text is longer than 100 caracters */}
      {props.contenu.length > 100 && (
        <Button
          title={expanded ? "Afficher moins" : "Afficher plus"}
          onPress={toggleExpand}
        />
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  contenu: {
    fontSize: 16,
    textAlign: "justify",
    margin: 10,
  },
});
