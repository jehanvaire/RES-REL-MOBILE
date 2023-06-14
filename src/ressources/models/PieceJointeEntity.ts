export class PieceJointeEntity {
  idUtilisateur!: number;
  idRessource!: number;
  uri!: string;
  type!: string;
  titre!: string;
  taille!: number;
  file!: any;
  lieu!: string;
  codePostal!: string;

  constructor(init?: Partial<PieceJointeEntity>) {
    Object.assign(this, init);
  }
}
