export class UtilisateurEntity {
  id!: number;
  nom!: string;
  prenom!: string;
  compteActif!: number;
  raisonBan!: string;
  mail!: string;
  bio!: string;
  dateNaissance!: Date;
  dateInscription!: Date;
  image!: ArrayBuffer;
  role!: number;
  codePostal!: string;
  motDePasse!: string;
  dateVerification!: Date;
  idRole!: number;

  constructor(init?: Partial<UtilisateurEntity>) {
    Object.assign(this, init);
  }
}
