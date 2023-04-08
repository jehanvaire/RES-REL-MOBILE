import CommentaireEntity from "../ressources/types/CommentaireEntity";
import RestClient from "./RestClient";

class CommentaireService {
  private baseUrlCommentaires = "commentaires";
  private baseUrlReponses = "reponsesCommentaires";

  private restClient: RestClient;
  constructor() {
    this.restClient = new RestClient();
  }

  public async GetCommentairePourUneRessource(
    params: any = {}
  ): Promise<CommentaireEntity[]> {
    const response = await this.restClient.get(
      this.baseUrlCommentaires,
      params
    );
    return response.data;
  }

  public async GetReponsesPourUnCommentaire(
    params: any = {}
  ): Promise<CommentaireEntity[]> {
    const response = await this.restClient.get(this.baseUrlReponses, params);
    return response.data;
  }

  public async PostCommentaire(params: any = {}): Promise<CommentaireEntity> {
    const response = await this.restClient.post(
      this.baseUrlCommentaires,
      params
    );
    return response;
  }

  public async PostReponseCommentaire(
    params: any = {}
  ): Promise<CommentaireEntity> {
    const response = await this.restClient.post(this.baseUrlReponses, params);
    return response;
  }
}

export default new CommentaireService();
