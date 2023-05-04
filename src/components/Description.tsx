import React, { useCallback, useState } from "react";

import { Text, StyleSheet, View } from "react-native";

const MAX_LINES = 3;

export default function Description(props: any) {
  const [afficherTexteComplet, setAfficherTexteComplet] = useState(false);

  const toggleShowMoreText = afficherTexteComplet ? " Voir moins" : "...plus";

  return (
    <>
      <Text>
        {props.contenu.length > 100
          ? afficherTexteComplet
            ? props.contenu
            : `${props.contenu.substring(0, 100)}`
          : props.contenu}
      </Text>
      {props.contenu.length > 100 && !afficherTexteComplet && (
        <Text onPress={() => setAfficherTexteComplet(true)}></Text>
      )}
    </>
    // <View>
    //   <Text
    //     style={styles.contenu}
    //     numberOfLines={etendu ? undefined : MAX_LINES}
    //     onTextLayout={affichePlusOuMoins}
    //     onPress={handleOnPress}
    //   >
    //     {etendu || !affichePlus ? props.contenu : props.contenu.slice(0, -20)}
    //     {affichePlus && (
    //       <Text style={styles.toggleShowMore} onPress={switchEtendu}>
    //         {toggleShowMoreText}
    //       </Text>
    //     )}
    //   </Text>
    // </View>
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
