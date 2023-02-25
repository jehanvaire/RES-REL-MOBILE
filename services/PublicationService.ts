import Publication from "../components/Publication/Publication";
import { StatusPublicationEnum } from "../ressources/enums/StatusPublicationEnum";
import { PublicationEntity } from "../ressources/types/PublicationEntity";

class PublicationService {
  private baseUrl = "publications";

  //   public static async getPublications(): Promise<any> {
  //     const response = await fetch(this.baseUrl);
  //     const data = await response.json();
  //     return data;
  //   }

  public async AddLikeToPublication(id: number): Promise<any> {
    // const response = await fetch(`${this.baseUrl}/${id}/like`, {
    //   method: "POST",
    // });
    // const data = await response.json();
    const data = "Publication likée";
    return data;
  }

  public async AddCommentaireToPublication(
    id: number,
    comment: string
  ): Promise<any> {
    // const response = await fetch(`${this.baseUrl}/${id}/comment`, {
    //   method: "POST",
    //   body: JSON.stringify({ comment }),
    // });
    // const data = await response.json();
    const data = "Commentaire ajouté";
    return data;
  }

  public async SauvegarderPublication(id: number): Promise<any> {
    // const response = await fetch(`${this.baseUrl}/${id}/save`, {
    //   method: "POST",
    // });
    // const data = await response.json();
    const data = "Publication sauvegardée";
    return data;
  }

  public async GetAllPublications(): Promise<PublicationEntity[]> {
    // const response = await fetch(this.baseUrl);
    // const data = await response.json();

    const auteur = "Auteur ";

    const data = [
      new PublicationEntity(
        1,
        "Titre1",
        auteur + 1,
        "Description de la publication 1",
        StatusPublicationEnum.ENATTENTE,
        undefined,
        new Date(),
        "https://picsum.photos/200/300",
        undefined
      ),
      new PublicationEntity(
        2,
        "Publication",
        auteur + 1,
        "Description de la publication 2",
        StatusPublicationEnum.ENATTENTE,
        undefined,
        new Date(),
        "https://picsum.photos/200/300",
        undefined
      ),
      new PublicationEntity(
        3,
        "Publi",
        auteur + 3,
        "Description de la publication 3",
        StatusPublicationEnum.ENATTENTE,
        undefined,
        new Date(),
        "https://picsum.photos/200/300",
        undefined
      ),
    ] as PublicationEntity[];
    return data;
  }

  public async GetListePublicationsUtilisateur(
    id: number
  ): Promise<PublicationEntity[]> {
    // const response = await fetch(`${this.baseUrl}/user/${id}`);
    // const data = await response.json();

    const auteur = "Auteur ";

    const data = [
      new PublicationEntity(
        1,
        "Titre1",
        auteur + 1,
        "Description de la publication 1",
        StatusPublicationEnum.ENATTENTE,
        undefined,
        new Date(),
        "https://picsum.photos/200/300",
        undefined
      ),
      new PublicationEntity(
        2,
        "Publication",
        auteur + 1,
        "Description de la publication 2",
        StatusPublicationEnum.ENATTENTE,
        undefined,
        new Date(),
        "https://picsum.photos/200/300",
        undefined
      ),
      new PublicationEntity(
        3,
        "Publi",
        auteur + 3,
        "Description de la publication 3",
        StatusPublicationEnum.ENATTENTE,
        undefined,
        new Date(),
        "https://picsum.photos/200/300",
        undefined
      ),
    ] as PublicationEntity[];
    return data;
  }
}

export default new PublicationService();
