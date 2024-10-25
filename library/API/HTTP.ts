import FetchConfig from "./config";
import { requestParams, RequestBody } from "./type";

class HTTP {
  private static api = FetchConfig();

  public static async get(url: string, query?: requestParams) {
    try {
      const queryString = query ? `?${new URLSearchParams(query as Record<string, string>)}` : "";
      const response = await this.api(`${url}${queryString}`);
      const data = await response.json();

      return {
        result: { ...data },
        error: null,
      };
    } catch (error: unknown) {
      return { result: null, error };
    }
  }

  public static async post(url: string, body: RequestBody) {
    console.log({ url, body });
    try {
      const response = await this.api(url, {
        method: "POST",
        body: JSON.stringify(body),
      });
      const data = await response.json();

      return {
        result: { ...data },
        error: null,
      };
    } catch (error: unknown) {
      return { result: null, error };
    }
  }
}

export default HTTP;
