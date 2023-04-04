import { StatusPublicationEnum } from "../enums/StatusPublicationEnum";

export class PublicationEntity {
  // Attributs
  private _id: number;
  private _titre: string;
  private _auteur: string;
  private _contenu: string;
  private _status: StatusPublicationEnum;
  private _raisonRefus: any;
  private _dateCreation: Date;
  private _datePublication: Date;
  private _lienImage: string;
  private _idCategorie: number;
  private _idUtilisateur: number;
  private _navigation: any;

  // Constructeur
  constructor(
    id: number,
    titre: string,
    auteur: string,
    contenu: string,
    status: StatusPublicationEnum,
    raisonRefus: any,
    dateCreation: Date,
    datePublication: Date,
    lienImage: string,
    idCategorie: number,
    idUtilisateur: number,
    navigation: any
  ) {
    this._id = id;
    this._titre = titre;
    this._auteur = auteur;
    this._contenu = contenu;
    this._status = status;
    this._raisonRefus = raisonRefus;
    this._dateCreation = dateCreation;
    this._datePublication = datePublication;
    this._lienImage = lienImage;
    this._idCategorie = idCategorie;
    this._idUtilisateur = idUtilisateur;
    this._navigation = navigation;
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get titre(): string {
    return this._titre;
  }

  get auteur(): string {
    return this._auteur;
  }

  get contenu(): string {
    return this._contenu;
  }

  get status(): StatusPublicationEnum {
    return this._status;
  }

  get raisonRefus(): any {
    return this._raisonRefus;
  }

  get dateCreation(): Date {
    return this._dateCreation;
  }

  get datePublication(): Date {
    return this._datePublication;
  }

  get lienImage(): string {
    return this._lienImage;
  }

  get idCategorie(): number {
    return this._idCategorie;
  }

  get idUtilisateur(): number {
    return this._idUtilisateur;
  }

  get navigation(): any {
    return this._navigation;
  }

  // Setters
  set id(value: number) {
    this._id = value;
  }

  set titre(value: string) {
    this._titre = value;
  }

  set auteur(value: string) {
    this._auteur = value;
  }

  set contenu(value: string) {
    this._contenu = value;
  }

  set status(value: StatusPublicationEnum) {
    this._status = value;
  }

  set raisonRefus(value: any) {
    this._raisonRefus = value;
  }

  set dateCreation(value: Date) {
    this._dateCreation = value;
  }

  set datePublication(value: Date) {
    this._datePublication = value;
  }

  set lienImage(value: string) {
    this._lienImage = value;
  }

  set idCategorie(value: number) {
    this._idCategorie = value;
  }

  set idUtilisateur(value: number) {
    this._idUtilisateur = value;
  }

  set navigation(value: any) {
    this._navigation = value;
  }
}
