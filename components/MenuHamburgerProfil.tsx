import {
  useDisclose,
  Center,
  Actionsheet,
  Box,
  Button,
  Text,
  Icon,
} from "native-base";
import { TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const MenuHamburgerProfil = () => {
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <Box>
      <Center>
        <TouchableOpacity>
          <Ionicons name={"ellipsis-vertical"} size={30} onPress={onOpen} />
        </TouchableOpacity>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Actionsheet.Item
              startIcon={
                <Icon
                  as={
                    <Ionicons
                      name="settings-outline"
                      size={20}
                      style={styles.elementSuperAdmin}
                    />
                  }
                />
              }
            >
              <Text style={styles.elementTextAdmin}>
                Gérer les comptes administrateur
              </Text>
            </Actionsheet.Item>
            <Actionsheet.Item
              startIcon={
                <Icon
                  as={
                    <Ionicons
                      name="list-outline"
                      size={20}
                      style={styles.elementSuperAdmin}
                    />
                  }
                />
              }
            >
              <Text style={styles.elementTextAdmin}>Catégories</Text>
            </Actionsheet.Item>
            <Actionsheet.Item
              startIcon={
                <Icon
                  as={
                    <Ionicons
                      name="person-add-outline"
                      size={20}
                      style={styles.elementSuperAdmin}
                    />
                  }
                />
              }
            >
              <Text style={styles.elementTextAdmin}>Gérer les comptes</Text>
            </Actionsheet.Item>
            <Actionsheet.Item
              startIcon={
                <Icon
                  as={
                    <Ionicons
                      name="stats-chart-outline"
                      size={20}
                      style={styles.elementAdmin}
                    />
                  }
                />
              }
            >
              <Text style={styles.elementTextAdmin}>Statistiques</Text>
            </Actionsheet.Item>
            <Actionsheet.Item
              startIcon={
                <Icon
                  as={
                    <Ionicons
                      name="settings-outline"
                      size={20}
                      style={styles.elementUtilisateur}
                    />
                  }
                />
              }
            >
              <Text style={styles.elementTextUtilisateur}>Paramètres</Text>
            </Actionsheet.Item>
            <Actionsheet.Item
              startIcon={
                <Icon
                  as={
                    <Ionicons
                      name="heart-outline"
                      size={20}
                      style={styles.elementUtilisateur}
                    />
                  }
                />
              }
            >
              <Text style={styles.elementTextUtilisateur}>Favoris</Text>
            </Actionsheet.Item>
            <Actionsheet.Item
              startIcon={
                <Icon
                  as={
                    <Ionicons
                      name="bookmark-outline"
                      size={20}
                      style={styles.elementUtilisateur}
                    />
                  }
                />
              }
            >
              <Text style={styles.elementTextUtilisateur}>Mis de côté</Text>
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
    </Box>
  );
};
export default MenuHamburgerProfil;

const styles = StyleSheet.create({
  elementUtilisateur: {
    alignItems: "center",
  },
  elementTextAdmin: {
    alignItems: "center",
    color: "red",
    fontSize: 15,
  },
  elementTextUtilisateur: {
    alignItems: "center",
    fontSize: 15,
  },
  elementAdmin: {
    alignItems: "center",
    color: "red",
  },
  elementSuperAdmin: {
    alignItems: "center",
    color: "red",
  },
  red: {
    color: "red",
  },
});
