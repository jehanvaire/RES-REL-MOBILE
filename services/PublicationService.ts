import { PublicationEntity } from "../ressources/types/PublicationEntity";
import RestClient from "./RestClient";
import { getTokenFromStorage } from "./AuthentificationService";
import { StatusPublicationEnum } from "../ressources/enums/StatusPublicationEnum";

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

  public async CreerPublication(publicationData: { id: number; titre: any; contenu: any; idUtilisateur: any; idCategorie: any; lienPieceJointe: any; idPieceJointe: number | null }, pieceJointe?: File): Promise<any> {
    try {
      const newPublicationData = new PublicationEntity(
        publicationData.id,
        publicationData.titre,
        "auteur",
        publicationData.contenu,
        StatusPublicationEnum.ENATTENTE,
        null,
        new Date(),
        new Date(),
        "",
        publicationData.idCategorie,
        publicationData.idUtilisateur,
        {}
      );
  
      // Créer la publication sans la pièce jointe
      const response = await this.restClient.post(this.baseUrl, newPublicationData);
  
      // Si la création de la publication a réussi et qu'il y a une pièce jointe, envoyez la pièce jointe et mettez à jour la publication
      if (response && pieceJointe) {
        const formData = new FormData();
        formData.append("pieceJointe", pieceJointe);
  
        const pieceJointeResponse = await this.AjouterPieceJointe(formData);
  
        if (pieceJointeResponse) {
          // Mettre à jour la publication avec l'ID de la pièce jointe
          const updatedPublicationData = { ...newPublicationData, idPieceJointe: pieceJointeResponse.data.id };
          await this.restClient.put(`${this.baseUrl}/${newPublicationData.id}`, updatedPublicationData);
        }
      }
  
      return response;
    } catch (error) {
      console.log("AAAAAAAAAAAAAA", error);
      return null;
    }
  }
  
  
  
  
  
  public async AjouterPieceJointe(pieceJointe: FormData): Promise<any | null> {
    console.log("AjouterPieceJointe", pieceJointe);
    try {
      const response = await this.restClient.post('piecesJointes', pieceJointe);
  
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
}

export default new PublicationService();