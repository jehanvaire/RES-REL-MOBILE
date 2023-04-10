import { BehaviorSubject, Observable } from "rxjs";
import CommentaireEntity from "../ressources/types/CommentaireEntity";
import RestClient from "./RestClient";

class CommentaireService {
  private baseUrlCommentaires = "commentaires";
  private baseUrlReponses = "reponsesCommentaires";

  private itemSelectionne = new BehaviorSubject<CommentaireEntity>(
    {} as CommentaireEntity
  );
  private afficherModalMenu = new BehaviorSubject<boolean>(false);
  private reponseACommentaire = new BehaviorSubject<CommentaireEntity>(
    {} as CommentaireEntity
  );

  private rechargerCommentaires = new BehaviorSubject<boolean>(false);

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

  public async SupprimerCommentaire(
    idCommentaire: number
  ): Promise<CommentaireEntity> {
    const response = await this.restClient.delete(
      this.baseUrlCommentaires + "/" + idCommentaire
    );
    return response;
  }

  public async SupprimerReponseCommentaire(
    idReponseCommentaire: number
  ): Promise<CommentaireEntity> {
    const response = await this.restClient.delete(
      this.baseUrlReponses + "/" + idReponseCommentaire
    );
    return response;
  }

  public setItemSelectionne(item: CommentaireEntity) {
    this.itemSelectionne.next(item);
  }

  public getItemSelectionne(): Observable<CommentaireEntity> {
    return this.itemSelectionne.asObservable();
  }

  public setAfficherModalMenu(afficher: boolean) {
    this.afficherModalMenu.next(afficher);
  }

  public getAfficherModalMenu(): Observable<boolean> {
    return this.afficherModalMenu.asObservable();
  }

  public setReponseACommentaire(item: CommentaireEntity) {
    this.reponseACommentaire.next(item);
  }

  public getReponseACommentaire(): Observable<CommentaireEntity> {
    return this.reponseACommentaire.asObservable();
  }

  public setRechargerCommentaires(recharger: boolean) {
    this.rechargerCommentaires.next(recharger);
  }

  public getRechargerCommentaires(): Observable<boolean> {
    return this.rechargerCommentaires.asObservable();
  }
}

export default new CommentaireService();
