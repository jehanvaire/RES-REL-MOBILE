import React from "react";
import {
  Button,
  Text,
  Box,
  Stack,
  Pressable,
  Center,
  Icon,
  Spacer,
} from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  BellOutlined,
  HomeOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";

export default function FooterNavigation() {
  const [selected, setSelected] = React.useState(1);

  return (
    <Box style={styles.footer}>
      <Stack direction="row" style={styles.stackFooter}>
        <TouchableOpacity
          onPress={() => {
            setSelected(0);
          }}
          style={selected === 0 ? styles.selected : styles.unselected}
        >
          <Center>
            <HomeOutlined />
            <Text style={styles.textIcon}>Menu</Text>
          </Center>
        </TouchableOpacity>
        <Spacer />
        <TouchableOpacity
          onPress={() => setSelected(1)}
          style={selected === 1 ? styles.selected : styles.unselected}
        >
          <Center>
            <SearchOutlined />
            <Text style={styles.textIcon}>Rechercher</Text>
          </Center>
        </TouchableOpacity>
        <Spacer />

        <TouchableOpacity
          onPress={() => setSelected(2)}
          style={selected === 2 ? styles.selected : styles.unselected}
        >
          <Center>
            <BellOutlined />
            <Text style={styles.textIcon}>Notifications</Text>
          </Center>
        </TouchableOpacity>
        <Spacer />

        <TouchableOpacity
          onPress={() => setSelected(3)}
          style={selected === 3 ? styles.selected : styles.unselected}
        >
          <Center>
            <UserOutlined />
            <Text style={styles.textIcon}>Profil</Text>
          </Center>
        </TouchableOpacity>
      </Stack>
    </Box>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  stackFooter: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    alignItems: "center",
    height: 60,
  },
  textIcon: {
    marginHorizontal: 20,
    color: "#333",
  },
  selected: {
    opacity: 1,
  },

  unselected: {
    opacity: 0.5,
  },
});
