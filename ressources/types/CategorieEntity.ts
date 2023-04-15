class CategorieEntity {
  id!: number;
  nom!: string;

  constructor(init?: Partial<CategorieEntity>) {
    Object.assign(this, init);
  }
}
