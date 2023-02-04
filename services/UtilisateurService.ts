import axios from "axios";
import { MMKV } from "react-native-mmkv";

export const getConnectedUser = (bearerToken: string) => {
  const storage = new MMKV();

  const user = storage.getString("user_token");

  if (user) {
    return user;
  } else {
    return axios
      .get("http://localhost:8080/api/user/me", {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
