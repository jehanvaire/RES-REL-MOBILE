import {
  useDisclose,
  Center,
  Actionsheet,
  Box,
  Button,
  Text,
} from "native-base";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const MenuHamburgerProfil = () => {
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <Box>
      <Center>
        <TouchableOpacity>
          <Ionicons name={"options-outline"} size={30} onPress={onOpen} />
        </TouchableOpacity>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Text
                fontSize="16"
                color="gray.500"
                _dark={{
                  color: "gray.300",
                }}
              >
                Albums
              </Text>
            </Box>
            <Actionsheet.Item>Delete</Actionsheet.Item>
            <Actionsheet.Item isDisabled>Share</Actionsheet.Item>
            <Actionsheet.Item>Play</Actionsheet.Item>
            <Actionsheet.Item>Favourite</Actionsheet.Item>
            <Actionsheet.Item>Cancel</Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
    </Box>
  );
};
export default MenuHamburgerProfil;
