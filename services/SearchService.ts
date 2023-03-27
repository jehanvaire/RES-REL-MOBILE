import { PublicationEntity } from "../ressources/types/PublicationEntity";
import BaseApi from "./baseApi";
class SearchService {
  private baseUrl = "search";

  private baseApi: BaseApi;

  constructor() {
    this.baseApi = new BaseApi();
  }

  public async Search(query: any = {}): Promise<any[]> {
    const response = await this.baseApi.post(this.baseUrl, query);
    return response.data;
  }
}

export default new SearchService();
