class FiltreEntity {
  dateDebut!: Date;
  dateFin!: Date;
  categorie!: number;

  constructor(init?: Partial<FiltreEntity>) {
    Object.assign(this, init);
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
  include?: string;
}
