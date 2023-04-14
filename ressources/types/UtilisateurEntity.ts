export class UtilisateurEntity {
  id!: number;
  nom!: string;
  prenom!: string;
  mail!: string;
  bio!: string;
  dateNaissance!: Date;
  dateInscription!: Date;
  image!: any;

  constructor(init?: Partial<UtilisateurEntity>) {
    Object.assign(this, init);
  }
}
