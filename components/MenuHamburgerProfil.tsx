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
            <Actionsheet.Item>
              Gérer les comptes administrateur
            </Actionsheet.Item>
            <Actionsheet.Item>Catégories</Actionsheet.Item>
            <Actionsheet.Item>Gérer les comptes</Actionsheet.Item>
            <Actionsheet.Item
              startIcon={
                <Icon
                  as={
                    <Ionicons
                      name="stats-chart-outline"
                      size={25}
                      style={[styles.element]}
                    />
                  }
                />
              }
            >
              Statistiques
            </Actionsheet.Item>
            <Actionsheet.Item
              startIcon={
                <Icon
                  as={
                    <Ionicons
                      name="settings-outline"
                      size={25}
                      style={styles.element}
                    />
                  }
                />
              }
            >
              Paramètres
            </Actionsheet.Item>
            <Actionsheet.Item
              startIcon={
                <Icon
                  as={
                    <Ionicons
                      name="heart-outline"
                      size={25}
                      style={styles.element}
                    />
                  }
                />
              }
            >
              Favoris
            </Actionsheet.Item>
            <Actionsheet.Item
              startIcon={
                <Icon
                  as={
                    <Ionicons
                      name="bookmark-outline"
                      size={25}
                      style={styles.element}
                    />
                  }
                />
              }
            >
              Mis de côté
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
    </Box>
  );
};
export default MenuHamburgerProfil;

const styles = StyleSheet.create({
  element: {
    alignItems: "center",
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
