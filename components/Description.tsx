import { Box } from "native-base";
import React, { useState } from "react";

import { Text, Button, StyleSheet } from "react-native";

export default function Description(props: any) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Box>
      <Text style={styles.description} numberOfLines={expanded ? undefined : 3}>
        {props.description}
      </Text>
      {/* show the button only if the text is longer than 100 caracters */}
      {props.description.length > 100 && (
        <Button
          title={expanded ? "Afficher moins" : "Afficher plus"}
          onPress={toggleExpand}
        />
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    margin: 10,
  },
});
