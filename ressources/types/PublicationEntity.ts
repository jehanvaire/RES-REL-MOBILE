import { StatusPublicationEnum } from "../enums/StatusPublicationEnum";

export class PublicationEntity {
  id!: number;
  titre!: string;
  auteur!: string;
  contenu!: string;
  status!: StatusPublicationEnum;
  raisonRefus!: any;
  dateCreation!: Date;
  datePublication!: Date;
  lienImage!: string;
  idCategorie!: number;
  idUtilisateur!: number;
  navigation!: any;

  constructor(init?: Partial<PublicationEntity>) {
    Object.assign(this, init);
  }
}
