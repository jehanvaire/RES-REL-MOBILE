import { TypeRelationEntity } from "./TypeRelationEntity";
import { UtilisateurEntity } from "./UtilisateurEntity";

export class RelationEntity {
  id!: number;
  idDemandeur!: number;
  idReceveur!: number;
  dateDemande!: Date;
  dateAcceptation!: Date;
  accepte!: boolean;
  typeRelation!: TypeRelationEntity;
  demandeur!: UtilisateurEntity;

  constructor(init?: Partial<RelationEntity>) {
    Object.assign(this, init);
  }
}
