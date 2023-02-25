import { StatusPublicationEnum } from "../enums/StatusPublicationEnum";

export class PublicationEntity extends Object {
  // Attributs
  private _id: number;
  private _titre: string;
  private _auteur: string;
  private _description: string;
  private _status: StatusPublicationEnum;
  private _raisonRefus: any;
  private _dateCreation: Date;
  private _lienImage: string;
  private _navigation: any;

  // Constructeur
  constructor(
    id: number,
    titre: string,
    auteur: string,
    description: string,
    status: StatusPublicationEnum,
    raisonRefus: any,
    dateCreation: Date,
    lienImage: string,
    navigation: any
  ) {
    super();
    this._id = id;
    this._titre = titre;
    this._auteur = auteur;
    this._description = description;
    this._status = status;
    this._raisonRefus = raisonRefus;
    this._dateCreation = dateCreation;
    this._lienImage = lienImage;
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

  get description(): string {
    return this._description;
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

  get lienImage(): string {
    return this._lienImage;
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

  set description(value: string) {
    this._description = value;
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

  set lienImage(value: string) {
    this._lienImage = value;
  }

  set navigation(value: any) {
    this._navigation = value;
  }
}
