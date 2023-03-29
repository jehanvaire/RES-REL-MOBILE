import { BehaviorSubject } from "rxjs";
import { PublicationEntity } from "../ressources/types/PublicationEntity";
import BaseApi from "./baseApi";
class SearchService {
  private baseUrl = "search";

  private baseApi: BaseApi;

  private listeResultats = new BehaviorSubject<any[]>([]);

  constructor() {
    this.baseApi = new BaseApi();
  }

  public async Search(query: any = {}): Promise<any[]> {
    const reponse = await this.baseApi.post(this.baseUrl, query);
    return reponse.data;
  }

  public SetListeResultats(listeResultats: any[]) {
    this.listeResultats.next(listeResultats);
  }

  public GetListeResultats() {
    return this.listeResultats.asObservable();
  }
}

export default new SearchService();
