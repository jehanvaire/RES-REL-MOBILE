import RestClient from "./RestClient";

class CommentaireService {
  private baseUrl = "commentaires";

  private restClient: RestClient;
  constructor() {
    this.restClient = new RestClient();
  }

  public async GetCommentairePourUneRessource(
    params: any = {}
  ): Promise<CommentaireEntity[]> {
    const response = await this.restClient.get(this.baseUrl, params);
    return response.data;
  }

  public async GetReponsesPourUnCommentaire(
    id: number,
    params: any = {}
  ): Promise<CommentaireEntity[]> {
    const response = await this.restClient.get(
      `${this.baseUrl}/${id}/reponses`,
      params
    );
    return response.data;
  }
}

export default new CommentaireService();
