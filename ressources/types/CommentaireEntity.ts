import { UtilisateurEntity } from "./UtilisateurEntity";

export default class CommentaireEntity {
  _id: number;
  _contenu: string;
  _nombreReponses: number;
  _supprime: number;
  _nombreSignalements: number;
  _idUtilisateur: number;
  _utilisateur: UtilisateurEntity;
  _idRessource: number;
  _reponses: CommentaireEntity[];
  _estReponse: boolean;

  constructor(
    id: number,
    contenu: string,
    nombreReponses: number,
    supprime: number,
    nombreSignalements: number,
    idUtilisateur: number,
    utilisateur: UtilisateurEntity,
    idRessource: number,
    reponses: CommentaireEntity[],
    estReponse: boolean
  ) {
    this._id = id;
    this._contenu = contenu;
    this._nombreReponses = nombreReponses;
    this._supprime = supprime;
    this._nombreSignalements = nombreSignalements;
    this._idUtilisateur = idUtilisateur;
    this._utilisateur = utilisateur;
    this._idRessource = idRessource;
    this._reponses = reponses;
    this._estReponse = estReponse;
  }

  get id(): number {
    return this._id;
  }

  get contenu(): string {
    return this._contenu;
  }

  set contenu(value: string) {
    this._contenu = value;
  }

  get nombreReponses(): number {
    return this._nombreReponses;
  }

  set nombreReponses(value: number) {
    this._nombreReponses = value;
  }

  get supprime(): number {
    return this._supprime;
  }

  set supprime(value: number) {
    this._supprime = value;
  }

  get nombreSignalements(): number {
    return this._nombreSignalements;
  }

  set nombreSignalements(value: number) {
    this._nombreSignalements = value;
  }

  get idUtilisateur(): number {
    return this._idUtilisateur;
  }

  set idUtilisateur(value: number) {
    this._idUtilisateur = value;
  }

  get idRessource(): number {
    return this._idRessource;
  }

  set idRessource(value: number) {
    this._idRessource = value;
  }

  get reponses(): CommentaireEntity[] {
    return this._reponses;
  }

  set reponses(value: CommentaireEntity[]) {
    this._reponses = value;
  }

  get estReponse(): boolean {
    return this._estReponse;
  }

  set estReponse(value: boolean) {
    this._estReponse = value;
  }

  get utilisateur(): UtilisateurEntity {
    return this._utilisateur;
  }

  set utilisateur(value: UtilisateurEntity) {
    this._utilisateur = value;
  }
}
