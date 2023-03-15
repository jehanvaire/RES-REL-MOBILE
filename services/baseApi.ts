export default class BaseApi {
  private baseUrl = "https://api.victor-gombert.fr/api/v1/";

  async get(path: string): Promise<any> {
    const url = this.baseUrl + path;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error(`API call failed with status code: ${response.status}`);
        return;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in API call:", error);
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