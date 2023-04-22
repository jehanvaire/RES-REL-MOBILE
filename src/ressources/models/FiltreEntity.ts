class FiltreEntity {
  dateDebut!: Date;
  dateFin!: Date;
  categorie!: number;

  constructor(init?: Partial<FiltreEntity>) {
    Object.assign(this, init);
  }
}
