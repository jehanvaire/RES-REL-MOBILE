export class Utilisateur {
  // Attributs
  private _nom: string;
  private _prenom: string;

  // Constructeur
  constructor(nom: string, prenom: string) {
    this._nom = nom;
    this._prenom = prenom;
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
}
