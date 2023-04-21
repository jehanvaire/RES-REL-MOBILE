export class PieceJointeEntity {
  idUtilisateur!: number;
  idRessource!: number;
  uri!: string;
  type!: string;
  titre!: string;
  taille!: number;
  file!: Blob;

  constructor(init?: Partial<PieceJointeEntity>) {
    Object.assign(this, init);
  }
}
