import Publication from "../components/Publication";
import { StatusPublicationEnum } from "../ressources/enums/StatusPublicationEnum";

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

  public async GetAllPublications(): Promise<any> {
    // const response = await fetch(this.baseUrl);
    // const data = await response.json();

    const autheur = "Auteur ";

    const data = [
      {
        id: 1,
        titre: "Publication 1",
        description: "Description de la publication 1",
        auteur: autheur,
        status: StatusPublicationEnum.ENATTENTE,
        raisonRefus: undefined,
        dateCreation: new Date(),
        lienImage: "https://picsum.photos/200/300",
      },
      {
        id: 2,
        titre: "Publication 2",
        description: "Description de la publication 2",
        auteur: autheur,
        status: StatusPublicationEnum.ENATTENTE,
        raisonRefus: undefined,
        dateCreation: new Date(),
        lienImage: "https://picsum.photos/200/300",
      },
      {
        id: 3,
        titre: "Publication 3",
        description: "Description de la publication 3",
        auteur: autheur,
        status: StatusPublicationEnum.ENATTENTE,
        raisonRefus: undefined,
        dateCreation: new Date(),
        lienImage: "https://picsum.photos/200/300",
      },
    ];
    return data;
  }

  public async GetListePublicationsUtilisateur(id: number): Promise<any> {
    // const response = await fetch(`${this.baseUrl}/user/${id}`);
    // const data = await response.json();

    const autheur = "Auteur " + id;

    // Create a list of publications with random number of comments
    // with type Publication, using fields auteur, titre, description, status, raisonRefus={undefined}, dateCreation, lienImage

    const data = [
      {
        id: 1,
        titre: "Publication 1",
        description: "Description de la publication 1",
        auteur: autheur,
        status: StatusPublicationEnum.ENATTENTE,
        raisonRefus: undefined,
        dateCreation: new Date(),
        lienImage: "https://picsum.photos/200/300",
      },
      {
        id: 2,
        titre: "Publication 2",
        description: "Description de la publication 2",
        auteur: autheur,
        status: StatusPublicationEnum.ENATTENTE,
        raisonRefus: undefined,
        dateCreation: new Date(),
        lienImage: "https://picsum.photos/200/300",
      },
      {
        id: 3,
        titre: "Publication 3",
        description: "Description de la publication 3",
        auteur: autheur,
        status: StatusPublicationEnum.ENATTENTE,
        raisonRefus: undefined,
        dateCreation: new Date(),
        lienImage: "https://picsum.photos/200/300",
      },
    ];

    return data;
  }
}

export default new PublicationService();
