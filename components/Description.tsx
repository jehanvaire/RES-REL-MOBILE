import { Box } from "native-base";
import React, { useCallback, useState } from "react";

import { Text, Button, StyleSheet } from "react-native";

const MAX_LINES = 3;

export default function Description(props: any) {
  const [etendu, setEtendu] = useState(false);
  const [affichePlus, setAffichePlus] = useState(false);

  const switchEtendu = () => {
    setEtendu(!etendu);
  };

  const affichePlusOuMoins = useCallback((e: any) => {
    setAffichePlus(e.nativeEvent.lines.length > MAX_LINES);
  }, []);

  return (
    <Box>
      <Text
        style={styles.contenu}
        numberOfLines={etendu ? undefined : MAX_LINES}
        onTextLayout={affichePlusOuMoins}
      >
        {props.contenu}
      </Text>
      {affichePlus ? (
        <Button
          title={etendu ? "Afficher moins" : "Afficher plus"}
          onPress={switchEtendu}
        />
      ) : null}
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
