import axios , { AxiosError } from "axios";
import { getTokenFromStorage } from "./AuthentificationService";



// interface Params {
//   [key: string]: string;
// }

export default class RestClient {
  private baseUrl = "https://api.victor-gombert.fr/api/v1/";
  private token = getTokenFromStorage();

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  async get(path: string, params: any = {}): Promise<any> {
    const url = this.baseUrl + path;

    const response = await axios.get(url, { params });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response.data.error || "Something went wrong");
    }
  }

  async post(path: string, body: any, headers: any = {}): Promise<any> {
    const url = this.baseUrl + path;
    try {
      const response = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          ...headers,
        },
      });
      console.log("reponse du serveur", response);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(response.data.error || "Something went wrong");
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        console.log("Erreur lors de la requête POST:", error.response.data);
      } else {
        console.log("Erreur lors de la requête POST:", error);
      }
      throw error;
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
    const response = await axios.delete(url);
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
}
