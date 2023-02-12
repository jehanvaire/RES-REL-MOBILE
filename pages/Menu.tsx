import React from "react";
import { Text } from "native-base";
import { MMKV } from "react-native-mmkv";

import { AuthentificationEnum } from "../ressources/enums/AuthentificationEnum";

const storage = new MMKV();

const user = storage.getString(AuthentificationEnum.CURRENT_USER);

// The authenticated view
const Menu = () => {
  return <Text>Hello! {user}</Text>;
};

export default Menu;
