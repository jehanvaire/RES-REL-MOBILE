export class UtilisateurEntity {
  // Attributs
  private _nom: string;
  private _prenom: string;
  private _email: string;
  private _contenu: string;
  private _dateNaissance: Date;
  private _dateInscription: Date;
  private _lienPhoto: string;

  // Constructeur
  constructor(
    nom: string,
    prenom: string,
    email: string,
    contenu: string,
    dateNaissance: Date,
    dateInscription: Date,
    lienPhoto: string
  ) {
    this._nom = nom;
    this._prenom = prenom;
    this._email = email;
    this._contenu = contenu;
    this._dateNaissance = dateNaissance;
    this._dateInscription = dateInscription;
    this._lienPhoto = lienPhoto;
  }

  get nom(): string {
    return this._nom;
  }

  get prenom(): string {
    return this._prenom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  set prenom(value: string) {
    this._prenom = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get contenu(): string {
    return this._contenu;
  }

  set contenu(value: string) {
    this._contenu = value;
  }

  get dateNaissance(): Date {
    return this._dateNaissance;
  }

  set dateNaissance(value: Date) {
    this._dateNaissance = value;
  }

  get dateInscription(): Date {
    return this._dateInscription;
  }

  set dateInscription(value: Date) {
    this._dateInscription = value;
  }

  get lienPhoto(): string {
    return this._lienPhoto;
  }

  set lienPhoto(value: string) {
    this._lienPhoto = value;
  }
}
