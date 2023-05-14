export class RelationEntity {
  id!: number;
  idDemandeur!: number;
  idReceveur!: number;
  dateDemande!: Date;
  dateAcceptation!: Date;
  accepte!: boolean;

  constructor(init?: Partial<RelationEntity>) {
    Object.assign(this, init);
  }
}
