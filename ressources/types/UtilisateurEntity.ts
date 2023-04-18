import { Image } from "react-native";
export class UtilisateurEntity {
  id!: number;
  nom!: string;
  prenom!: string;
  mail!: string;
  bio!: string;
  dateNaissance!: Date;
  dateInscription!: Date;
  image!: ArrayBuffer;
  role!: number;

  constructor(init?: Partial<UtilisateurEntity>) {
    Object.assign(this, init);
  }
}
