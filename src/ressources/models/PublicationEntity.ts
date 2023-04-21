import { StatusPublicationEnum } from "../enums/StatusPublicationEnum";
import { UtilisateurEntity } from "./UtilisateurEntity";

export class PublicationEntity {
  id!: number;
  titre!: string;
  contenu!: string;
  status!: StatusPublicationEnum;
  raisonRefus!: any;
  dateCreation!: Date;
  datePublication!: Date;
  image!: any;
  idCategorie!: number;
  idUtilisateur!: number;
  utilisateur!: UtilisateurEntity;
  navigation!: any;

  constructor(init?: Partial<PublicationEntity>) {
    Object.assign(this, init);
  }
}