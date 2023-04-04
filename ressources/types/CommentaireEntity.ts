class CommentaireEntity {
  _id: number;
  _contenu: string;
  _nombreReponses: number;
  _supprime: number;
  _nombreSignalements: number;
  _idUtilisateur: number;
  _idRessource: number;

  constructor(
    id: number,
    contenu: string,
    nombreReponses: number,
    supprime: number,
    nombreSignalements: number,
    idUtilisateur: number,
    idRessource: number
  ) {
    this._id = id;
    this._contenu = contenu;
    this._nombreReponses = nombreReponses;
    this._supprime = supprime;
    this._nombreSignalements = nombreSignalements;
    this._idUtilisateur = idUtilisateur;
    this._idRessource = idRessource;
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
}
