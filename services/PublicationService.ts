import { PublicationEntity } from "../ressources/types/PublicationEntity";
import RestClient from "./RestClient";
export class PublicationService {
  private baseUrl = "ressources";

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

  public async GetPublications(query: any = {}): Promise<PublicationEntity[]> {
    const response = await this.restClient.get(this.baseUrl, query);
    return response.data;
  }

  public async GetAllPublications(
    filtres: any = {}
  ): Promise<PublicationEntity[]> {
    const response = await this.restClient.get(this.baseUrl, filtres);

    const listePublications = response.data.map((publication: any) => {
      return new PublicationEntity(
        publication.id,
        publication.titre,
        publication.auteur,
        publication.contenu,
        publication.status,
        publication.raisonRefus,
        publication.dateCreation,
        publication.datePublication,
        "https://picsum.photos/200/300",
        publication.idCategorie,
        publication.idUtilisateur,
        publication.navigation
      );
    });

    return listePublications;
  }

  public async GetListePublicationsUtilisateur(
    id: number,
    params: any = {}
  ): Promise<PublicationEntity[]> {
    const response = await this.restClient.get(this.baseUrl, params);

    const listePublications = response.data.map((publication: any) => {
      return new PublicationEntity(
        publication.id,
        publication.titre,
        publication.auteur,
        publication.contenu,
        publication.status,
        publication.raisonRefus,
        publication.dateCreation,
        publication.datePublication,
        "https://picsum.photos/200/300",
        publication.idCategorie,
        publication.idUtilisateur,
        publication.navigation
      );
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
}

export default new PublicationService();
