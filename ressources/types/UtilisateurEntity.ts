export class UtilisateurEntity {
  id!: number;
  nom!: string;
  prenom!: string;
  mail!: string;
  bio!: string;
  dateNaissance!: Date;
  dateInscription!: Date;
  lienPhoto!: string;

  constructor(init?: Partial<UtilisateurEntity>) {
    Object.assign(this, init);
  }
}
