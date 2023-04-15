import { UtilisateurEntity } from "./UtilisateurEntity";

export default class CommentaireEntity {
  id!: number;
  idCommentaire!: number;
  contenu!: string;
  nombreReponses!: number;
  supprime!: number;
  nombreSignalements!: number;
  datePublication!: Date;
  idUtilisateur!: number;
  utilisateur!: UtilisateurEntity;
  idRessource!: number;
  reponses!: CommentaireEntity[];
  estReponse!: boolean;

  constructor(init?: Partial<CommentaireEntity>) {
    Object.assign(this, init);
  }
}
