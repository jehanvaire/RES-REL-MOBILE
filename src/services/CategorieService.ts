import RestClient from "./RestClient";

class CategorieService {
  private baseUrl = "categories";

  private categories: CategorieEntity[] = [];

  private restClient: RestClient;
  constructor() {
    this.restClient = new RestClient();
  }

  private async fetchCategories(): Promise<CategorieEntity[]> {
    const response = await this.restClient.get(this.baseUrl);
    this.categories = response.data;
    return response.data;
  }

  public async GetAllCategories(): Promise<CategorieEntity[]> {
    if (this.categories.length === 0) {
      return await this.fetchCategories();
    }
    return this.categories;
  }
}

export default new CategorieService();
