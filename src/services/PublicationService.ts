import { BehaviorSubject } from "rxjs";
import { PublicationEntity } from "../ressources/models/PublicationEntity";
import RestClient from "./RestClient";
import { UtilisateurEntity } from "../ressources/models/UtilisateurEntity";
import { storage } from "./AuthentificationService";
import { AuthentificationEnum } from "../ressources/enums/AuthentificationEnum";

export class PublicationService {
  private baseUrl = "ressources";
  private pieceJointeUrl = "piecesJointes";

  private restClient: RestClient;;
  private user_json = storage.getString(AuthentificationEnum.CURRENT_USER) ?? "";
  private user = JSON.parse(this.user_json) as UtilisateurEntity;

  private rechargerPublications = new BehaviorSubject<boolean>(false);

  constructor() {
    this.restClient = new RestClient();
  }


  public async GetFavorisFromPublication(params: any = {}): Promise<any> {
    const response = await this.restClient.getAuthentifie(`favoris`, params);
    return response;
  }

  public async AddFavoriToPublication(id: number): Promise<any> {
    const response = await this.restClient.post(
      `favoris`,
      {
        idUtilisateur: this.user.id,
        idRessource: id
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log("Response", response)
    return response.data;
  }

  public async RemoveFavoriFromPublication(id: number): Promise<any> {
    const response = await this.restClient.delete(
      `favoris/${id}`
    );
    return response;
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
