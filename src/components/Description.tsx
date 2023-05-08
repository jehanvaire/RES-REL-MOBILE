import React, { useCallback, useState } from "react";

import { Text, StyleSheet, View } from "react-native";

const MAX_LINES = 3;

export default function Description({ contenu }: any) {
  const [etendu, setEtendu] = useState(false);

  const handleOnPress = useCallback(() => {
    setEtendu((etendu) => !etendu);
  }, []);

  return (
    <View>
      <Text
        style={styles.contenu}
        numberOfLines={etendu ? undefined : MAX_LINES}
        onPress={handleOnPress}
      >
        {etendu ? contenu : contenu.slice(0, 100)}
        {contenu.length > 100 && !etendu ? (
          <Text style={styles.toggleShowMore}> ...</Text>
        ) : (
          ""
        )}
      </Text>
    </View>
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
