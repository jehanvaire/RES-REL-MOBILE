import {
  Box,
  VStack,
  Popover,
  Select,
  CheckIcon,
  Button,
  FormControl,
  Input,
} from "native-base";
import { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";

function Filtre() {
  const initialFocusRef = React.useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View style={styles.popover}>
      <Popover
        placement="bottom right"
        offset={50}
        trigger={(triggerProps) => {
          return (
            <TouchableOpacity
              alignSelf="center"
              {...triggerProps}
              onPress={() => setIsOpen(true)}
            >
              <Ionicons
                name="options-outline"
                size={25}
                style={[styles.searchIcon]}
              />
            </TouchableOpacity>
          );
        }}
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}
      >
        <Popover.Content width="56">
          <Popover.Arrow />
          <Popover.CloseButton />
          <Popover.Header>Filtres</Popover.Header>
          <Popover.Body>
            <FormControl>
              <FormControl.Label
                _text={{
                  fontSize: "xs",
                  fontWeight: "medium",
                }}
              >
                First Name
              </FormControl.Label>
              <Input rounded="sm" fontSize="xs" ref={initialFocusRef} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label
                _text={{
                  fontSize: "xs",
                  fontWeight: "medium",
                }}
              >
                Last Name
              </FormControl.Label>
              <Input rounded="sm" fontSize="xs" />
            </FormControl>
          </Popover.Body>
          <Popover.Footer>
            <Button.Group>
              <Button colorScheme="coolGray" variant="ghost">
                Cancel
              </Button>
              <Button>Save</Button>
            </Button.Group>
          </Popover.Footer>
        </Popover.Content>
      </Popover>
    </View>
  );
}

export default Filtre;

const styles = StyleSheet.create({
  popover: {
    // marginTop: 50,
  },
  searchIcon: {
    color: "black",
    marginTop: 5,
    marginRight: 10,
  },
});
