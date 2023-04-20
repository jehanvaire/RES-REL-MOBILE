import { Box } from "native-base";
import React, { useCallback, useState } from "react";

import { Text, StyleSheet } from "react-native";

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

  const handleOnPress = () => {
    if (affichePlus) {
      switchEtendu();
    }
  };

  //TODO : afficher "...plus" à la fin des 3 lignes (MAX_LINES) [voir moins fonctionne]
  const toggleShowMoreText = etendu ? " Voir moins" : "...plus";

  return (
    <Box>
      <Text
        style={styles.contenu}
        numberOfLines={etendu ? undefined : MAX_LINES}
        onTextLayout={affichePlusOuMoins}
        onPress={handleOnPress}
      >
        {etendu || !affichePlus ? props.contenu : props.contenu.slice(0, -20)}
        {affichePlus && (
          <Text style={styles.toggleShowMore} onPress={switchEtendu}>
            {toggleShowMoreText}
          </Text>
        )}
      </Text>
    </Box>
  );
}

const styles = StyleSheet.create({
  contenu: {
    fontSize: 16,
    textAlign: "justify",
    margin: 10,
  },
  toggleShowMore: {
    color: "#828282",
    fontSize: 16,
  },
});
