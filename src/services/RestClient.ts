import axios from "axios";
import { getTokenFromStorage } from "./AuthentificationService";
import { PieceJointeEntity } from "../ressources/models/PieceJointeEntity";

export default class RestClient {
  private baseUrl = "https://api.victor-gombert.fr/api/v1/";
  // private token = getTokenFromStorage();
  private token = "1|x6Y5BDn2kEBOHe1UATIejquEZFnP6zhbOhJRNpLT";

  async get(path: string, params = {}): Promise<any> {
    const url = this.baseUrl + path;

    const response = await axios.get(url, { params });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response.data.error || "Something went wrong");
    }
  }

  async post(path: string, body: any): Promise<any> {
    const url = this.baseUrl + path;
    const response = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response.data.error || "Something went wrong");
    }
  }

  async put(path: string, body: any): Promise<any> {
    const url = this.baseUrl + path;
    const response = await axios.put(url, body);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response.data.error || "Something went wrong");
    }
  }

  async delete(path: string): Promise<any> {
    const url = this.baseUrl + path;
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response.data.error || "Something went wrong");
    }
  }

  async patch(path: string, body: any): Promise<any> {
    const url = this.baseUrl + path;
    const response = await axios.patch(url, body);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response.data.error || "Something went wrong");
    }
  }

  async upload(path: string, body: PieceJointeEntity): Promise<any> {
    const url = this.baseUrl + path;

    // à déplacer dans le service si on le garde
    const formData = new FormData();
    formData.append("file", body.file);
    formData.append("titre", body.titre);
    formData.append("type", body.type);
    formData.append("idUtilisateur", String(body.idUtilisateur));
    formData.append("idRessource", String(body.idRessource));

    const response = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Fin de l'envoi de la pièce jointe", response);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response.data.error || "Something went wrong");
    }
  }
}
