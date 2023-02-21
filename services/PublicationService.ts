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
    const data = [
      {
        id: 1,
        title: "Publication 1",
        description: "Description de la publication 1",
        likes: 10,
        comments: [
          {
            id: 1,
            comment: "Commentaire 1",
            likes: 5,
          },
          {
            id: 2,
            comment: "Commentaire 2",
            likes: 2,
          },
        ],
      },
      {
        id: 2,
        title: "Publication 2",
        description: "Description de la publication 2",
        likes: 5,
        comments: [
          {
            id: 1,
            comment: "Commentaire 1",
            likes: 5,
          },
          {
            id: 2,
            comment: "Commentaire 2",
            likes: 2,
          },
        ],
      },
    ];
    return data;
  }

  public async GetAllPublicationsByUser(id: number): Promise<any> {
    // const response = await fetch(`${this.baseUrl}/user/${id}`);
    // const data = await response.json();
    const data = [
      {
        id: 1,
        title: "Publication 1",
        description: "Description de la publication 1",
        likes: 10,
        comments: [
          {
            id: 1,
            comment: "Commentaire 1",
            likes: 5,
          },
          {
            id: 2,
            comment: "Commentaire 2",
            likes: 2,
          },
        ],
      },
      {
        id: 2,
        title: "Publication 2",
        description: "Description de la publication 2",
        likes: 5,
        comments: [
          {
            id: 1,
            comment: "Commentaire 1",
            likes: 5,
          },
          {
            id: 2,
            comment: "Commentaire 2",
            likes: 2,
          },
        ],
      },
    ];
    return data;
  }
}

export default new PublicationService();
