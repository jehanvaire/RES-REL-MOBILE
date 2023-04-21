import { PieceJointeEntity } from "../ressources/models/PieceJointeEntity";
import { PublicationEntity } from "../ressources/models/PublicationEntity";
import RestClient from "./RestClient";
import RNFetchBlob from "rn-fetch-blob";

export class PublicationService {
  private baseUrl = "ressources";
  private pieceJointeUrl = "piecesJointes";

  private restClient: RestClient;

  constructor() {
    this.restClient = new RestClient();
  }

  //   public static async getPublications(): Promise<any> {
  //     const response = await fetch(this.baseUrl);
  //     const data = await response.json();
  //     return data;
  //   }

  public async AddLikeToPublication(id: number): Promise<any> {
    // const response = await fetch(`${this.baseUrl}/${id}/like`, {
    //   method: "POST",
    // });
    // const data = await response.json();
    const data = "Publication likée";
    return data;
  }

  public async AddCommentaireToPublication(
    id: number,
    comment: string
  ): Promise<any> {
    // const response = await fetch(`${this.baseUrl}/${id}/comment`, {
    //   method: "POST",
    //   body: JSON.stringify({ comment }),
    // });
    // const data = await response.json();
    const data = "Commentaire ajouté";
    return data;
  }

  public async SauvegarderPublication(id: number): Promise<any> {
    // const response = await fetch(`${this.baseUrl}/${id}/save`, {
    //   method: "POST",
    // });
    // const data = await response.json();
    const data = "Publication sauvegardée";
    return data;
  }

  public async GetPublications(params: any = {}): Promise<PublicationEntity[]> {
    const response = await this.restClient.get(this.baseUrl, params);

    const listePublications = response.data.map((publication: any) => {
      return new PublicationEntity(publication);
    });

    return listePublications;
  }

  public async ValiderPublication(id: number): Promise<any> {
    // const response = await fetch(`${this.baseUrl}/${id}/validate`, {
    //   method: "POST",
    // });
    // const data = await response.json();
    const data = "Publication validée";
    return data;
  }

  public async RefuserPublication(id: number): Promise<any> {
    // const response = await fetch(`${this.baseUrl}/${id}/refuse`, {
    //   method: "POST",
    // });
    // const data = await response.json();
    const data = "Publication refusée";
    return data;
  }

  public async CreerPublication(
    publicationData: PublicationEntity
  ): Promise<any> {
    const response = await this.restClient.post(this.baseUrl, publicationData);
    return response;
  }

  public async AjouterPieceJointe(params: FormData): Promise<any> {
    const response = this.restClient.upload(this.pieceJointeUrl, params);
    return response;
  }
}

export default new PublicationService();
