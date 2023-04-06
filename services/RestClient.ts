import axios from "axios";

interface Params {
  [key: string]: string;
}
export default class RestClient {
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
    const response = await axios.post(url, body);
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
