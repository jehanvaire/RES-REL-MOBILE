import { Image } from "react-native";
import RestClient from "./RestClient";

class UtilisateurService {
  private baseUrl = "utilisateurs";

  private restClient: RestClient;
  constructor() {
    this.restClient = new RestClient();
  }
}

export default new UtilisateurService();
