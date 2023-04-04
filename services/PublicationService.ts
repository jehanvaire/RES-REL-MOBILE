import { PublicationEntity } from "../ressources/types/PublicationEntity";
import BaseApi from "./baseApi";
import axios from 'axios';
import { AuthentificationEnum } from "../ressources/enums/AuthentificationEnum";
import { storage, getTokenFromStorage } from "./AuthentificationService";


const API_URL = 'https://api.victor-gombert.fr/api/v1';

const apiClient = axios.create({
  baseURL: "https://api.victor-gombert.fr/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await getTokenFromStorage();
    console.log("Token from storage:", token);
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export { apiClient };


// Ajoutez cet intercepteur pour déboguer les erreurs
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log('Error details:', error);
    console.log('Error config:', error.config);
    console.log('Error response:', error.response);
    return Promise.reject(error);
  }
);
class PublicationService {
  private baseUrl = "ressources";

  private baseApi: BaseApi;

  constructor() {
    this.baseApi = new BaseApi();
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

  public async GetAllPublications(): Promise<PublicationEntity[]> {
    // fetch to get all publications using this url : https://api.victor-gombert.fr/api/v1/ressources
    const response = await this.baseApi.get(this.baseUrl);

    // console.log(response.data);

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
    id: number
  ): Promise<PublicationEntity[]> {
    const response = await this.baseApi.get(this.baseUrl);

    // console.log(response.data);

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

  public async CreerPublication(publication: FormData): Promise<any> {
    try {
      const response = await apiClient.post(
        `/${this.baseUrl}`,
        publication,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async AjouterPieceJointe(pieceJointe: FormData, idRessource: any) {
    try {
      const response = await axios.post(
        `${API_URL}/piecesJointes`,
        pieceJointe,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }  
}

export default new PublicationService();