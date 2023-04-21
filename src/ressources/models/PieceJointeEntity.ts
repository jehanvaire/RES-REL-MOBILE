import { StatusPublicationEnum } from "../enums/StatusPublicationEnum";
import { UtilisateurEntity } from "./UtilisateurEntity";

export class PieceJointeEntity {
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

  constructor(init?: Partial<PieceJointeEntity>) {
    Object.assign(this, init);
  }
}
