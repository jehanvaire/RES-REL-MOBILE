import axios from "axios";
import { storage } from "./AuthentificationService";
import { AuthentificationEnum } from "../ressources/enums/AuthentificationEnum";

export default class RestClient {
  private baseUrl = "https://api.victor-gombert.fr/api/v1/";

  private token = storage.getString(AuthentificationEnum.ACCESS_TOKEN_KEY);

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
    console.log("token", this.token);
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

  async patch(path: string, body = {}): Promise<any> {
    const url = this.baseUrl + path;

    const response = await axios.patch(url, body, {
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

  async upload(path: string, body: FormData): Promise<any> {
    const url = this.baseUrl + path;

    const response = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response.data.error || "Something went wrong");
    }
  }
}
