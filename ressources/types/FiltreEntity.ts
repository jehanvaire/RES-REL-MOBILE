class FiltreEntity {
  private _dateDebut: Date;
  private _dateFin: Date;
  private _categorie: number;

  constructor(dateDebut: Date, dateFin: Date, categorie: number) {
    this._dateDebut = dateDebut;
    this._dateFin = dateFin;
    this._categorie = categorie;
  }

  get dateDebut(): Date {
    return this._dateDebut;
  }

  set dateDebut(value: Date) {
    this._dateDebut = value;
  }

  get dateFin(): Date {
    return this._dateFin;
  }

  set dateFin(value: Date) {
    this._dateFin = value;
  }

  get categorie(): number {
    return this._categorie;
  }

  set categorie(value: number) {
    this._categorie = value;
  }
}

interface FiltresRequete {
  "datePublication[greaterThanEquals]="?: Date;
  "datePublication[lowerThanEquals]="?: Date;
  "idCategorie[equals]="?: number;
  "partage[equals]="?: string;
  "status[equals]="?: string;
  ressourceQuery?: string;
  utilisateurQuery?: string;
}
