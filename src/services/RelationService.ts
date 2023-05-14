import { RelationEntity } from "../ressources/models/RelationEntity";
import RestClient from "./RestClient";

class RelationService {
  private baseUrl = "relations";

  private restClient: RestClient;
  constructor() {
    this.restClient = new RestClient();
  }

  public async GetRelation(params: any = {}): Promise<RelationEntity> {
    const response = await this.restClient.get(this.baseUrl, params);
    return response.data[0];
  }

  public async GetRelations(params: any = {}): Promise<RelationEntity[]> {
    const response = await this.restClient.get(this.baseUrl, params);
    return response.data;
  }

  public async DemanderRelation(params: any = {}): Promise<RelationEntity> {
    const response = await this.restClient.post(this.baseUrl, params);
    return response;
  }
}

export default new RelationService();
