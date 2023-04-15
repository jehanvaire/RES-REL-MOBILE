import { Image } from "react-native";
import RestClient from "./RestClient";

class UtilisateurService {
  private baseUrl = "utilisateurs";

  private restClient: RestClient;
  constructor() {
    this.restClient = new RestClient();
  }

  public async GetPhotoUtilisateur(params: any = {}): Promise<Image> {
    const image = await this.restClient.get(
      `${this.baseUrl}/${params.id}/download`,
      params
    );
    return image;
  }
}

export default new UtilisateurService();
