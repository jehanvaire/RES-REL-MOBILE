export class PieceJointeEntity {
  idUtilisateur!: number;
  idRessource!: number;
  uri!: string;
  type!: string;
  titre!: string;
  taille!: number;
  file!: any;

  constructor(init?: Partial<PieceJointeEntity>) {
    Object.assign(this, init);
  }
}
