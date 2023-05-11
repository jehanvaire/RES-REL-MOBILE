import { BehaviorSubject } from "rxjs";
import { PublicationEntity } from "../ressources/models/PublicationEntity";
import RestClient from "./RestClient";

export class PublicationService {
  private baseUrl = "ressources";
  private pieceJointeUrl = "piecesJointes";

  private restClient: RestClient;

  private rechargerPublications = new BehaviorSubject<boolean>(false);

  constructor() {
    this.restClient = new RestClient();
  }

  public async AddLikeToPublication(id: number): Promise<any> {
    // const response = await fetch(`${this.baseUrl}/${id}/like`, {
    //   method: "POST",
    // });
    // const data = await response.json();
    const data = "Publication likée";
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
    const response = await this.restClient.patch(
      `${this.baseUrl}/${id}/enable`
    );
    return response;
  }

  public async RefuserPublication(params = {}): Promise<any> {
    const response = await this.restClient.patch(
      `${this.baseUrl}/disable`,
      params
    );
    return response;
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

  public setRechargerPublications(value: boolean) {
    this.rechargerPublications.next(value);
  }

  public getRechargerPublications() {
    return this.rechargerPublications.asObservable();
  }

  public getPdfName(id: number): Promise<any> {
    return this.restClient.head(this.pieceJointeUrl + "/" + id + "/download");
  }
}

export default new PublicationService();
