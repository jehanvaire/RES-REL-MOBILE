import axios from "axios";

interface Params {
  [key: string]: string;
}
export default class BaseApi {
  private baseUrl = "https://api.victor-gombert.fr/api/v1/";

  async get(path: string, params?: Params): Promise<any> {
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
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  }

  async put(path: string, body: any): Promise<any> {
    const url = this.baseUrl + path;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  }

  async delete(path: string): Promise<any> {
    const url = this.baseUrl + path;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }
}
