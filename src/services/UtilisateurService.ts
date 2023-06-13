
import { BehaviorSubject } from "rxjs";
import RestClient from "./RestClient";

class UtilisateurService {
  private baseUrl = "utilisateurs";

  private listeComptesActifs = new BehaviorSubject<any[]>([]);
  private listeComptesBannis = new BehaviorSubject<any[]>([]);

  private restClient: RestClient;
  constructor() {
    this.restClient = new RestClient();
  }

  public async ChercherUtilisateurs(params = {}) {
    return await this.restClient.get(this.baseUrl, params);
  }

  public SetComptesActifs(listeResultats: any[]) {
    this.listeComptesActifs.next(listeResultats);
  }

  public GetComptesActifs() {
    return this.listeComptesActifs.asObservable();
  }

  public SetComptesBannis(listeResultats: any[]) {
    this.listeComptesBannis.next(listeResultats);
  }

  public GetComptesBannis() {
    return this.listeComptesBannis.asObservable();
  }
}

export default new UtilisateurService();
