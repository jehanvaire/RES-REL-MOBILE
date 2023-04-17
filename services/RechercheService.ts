import { BehaviorSubject } from "rxjs";
import RestClient from "./RestClient";
class RechercheService {
  private baseUrl = "rechercher";

  private restClient: RestClient;

  private listeResRessources = new BehaviorSubject<any[]>([]);
  private listeResUtilisateurs = new BehaviorSubject<any[]>([]);

  private afficheHeader = new BehaviorSubject<boolean>(false);

  constructor() {
    this.restClient = new RestClient();
  }

  public async Chercher(query: any = {}): Promise<any> {
    const reponse = await this.restClient.post(this.baseUrl, query);
    return reponse;
  }

  public SetListeResRessources(listeResultats: any[]) {
    this.listeResRessources.next(listeResultats);
  }

  public GetListeResRessources() {
    return this.listeResRessources.asObservable();
  }

  public SetListeResUtilisateurs(listeResultats: any[]) {
    this.listeResUtilisateurs.next(listeResultats);
  }

  public GetListeResUtilisateurs() {
    return this.listeResUtilisateurs.asObservable();
  }

  public SetAfficheHeader(affiche: boolean) {
    this.afficheHeader.next(affiche);
  }

  public GetAfficheHeader() {
    return this.afficheHeader.asObservable();
  }
}

export default new RechercheService();
