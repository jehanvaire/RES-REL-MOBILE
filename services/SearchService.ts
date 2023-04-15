import { BehaviorSubject } from "rxjs";
import RestClient from "./RestClient";
class SearchService {
  private baseUrl = "search";

  private restClient: RestClient;

  private listeResultats = new BehaviorSubject<any[]>([]);

  constructor() {
    this.restClient = new RestClient();
  }

  public async Search(query: any = {}): Promise<any[]> {
    const reponse = await this.restClient.post(this.baseUrl, query);
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
