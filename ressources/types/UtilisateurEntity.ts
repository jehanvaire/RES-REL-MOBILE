export class UtilisateurEntity {
  // id! : number;
  // nom!: string;
  // prenom!: string;
  // mail!: string;
  // bio!: string;
  // dateNaissance!: Date;
  // dateInscription!: Date;
  // lienPhoto!: string;

  // constructor(init?: Partial<UtilisateurEntity>) {
  //   Object.assign(this, init);
  // }
  // // Attributs

  private _id: number;
  private _nom: string;
  private _prenom: string;
  private _mail: string;
  private _bio: string;
  private _dateNaissance: Date;
  private _dateInscription: Date;

  // Constructeur
  constructor(
    id: number,
    nom: string,
    prenom: string,
    mail: string,
    bio: string,
    dateNaissance: Date,
    dateInscription: Date
  ) {
    this._id = id;
    this._nom = nom;
    this._prenom = prenom;
    this._mail = mail;
    this._bio = bio;
    this._dateNaissance = dateNaissance;
    this._dateInscription = dateInscription;
  }

  // Getters et Setters
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
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

  get mail(): string {
    return this._mail;
  }

  set mail(value: string) {
    this._mail = value;
  }

  get bio(): string {
    return this._bio;
  }

  set bio(value: string) {
    this._bio = value;
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
}
