import axios from "axios";
import { APP_CONFIG } from "../config/app.config";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

type AdapterOption = "fetch" | "axios";

export class Fetch {
  private static _baseUrl = `${APP_CONFIG.app.apiUrl}`;
  private static _adapter: AdapterOption = "axios";

  static setAdapter(adapter: AdapterOption) {
    this._adapter = adapter;
  }

  private static async handleResponse<T>(
    response: Response
  ): Promise<{ data: T; status: number }> {
    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(
        `HTTP ${response.status}: ${response.statusText}${errorText ? ` - ${errorText}` : ""}`
      );
    }
    const data = (await response.json()) as T;
    return { data, status: response.status };
  }

  static async get<T = unknown>(
    url: string,
    header?: RequestInit
  ): Promise<{ data: T; status: number }> {
    if (this._adapter === "axios") {
      const response = await axios.get<T>(`${this._baseUrl}${url}`, {
        ...config,
        ...header,
      } as Parameters<typeof axios.get>[1]);
      return { data: response.data, status: response.status };
    } else {
      const response = await fetch(`${this._baseUrl}${url}`, {
        ...config,
        ...header,
      });
      return this.handleResponse<T>(response);
    }
  }

  static async post<T = unknown>(
    url: string,
    data: unknown,
    header?: RequestInit
  ): Promise<{ data: T; status: number }> {
    if (this._adapter === "axios") {
      const response = await axios.post<T>(`${this._baseUrl}${url}`, data, {
        ...config,
        ...header,
      } as Parameters<typeof axios.post>[2]);
      return { data: response.data, status: response.status };
    } else {
      const response = await fetch(`${this._baseUrl}${url}`, {
        ...config,
        ...header,
        method: "POST",
        body: typeof data === "string" ? data : JSON.stringify(data),
      });
      return this.handleResponse<T>(response);
    }
  }

  static async put<T = unknown>(
    url: string,
    data: unknown,
    header?: RequestInit
  ): Promise<{ data: T; status: number }> {
    if (this._adapter === "axios") {
      const response = await axios.put<T>(`${this._baseUrl}${url}`, data, {
        ...config,
        ...header,
      } as Parameters<typeof axios.put>[2]);
      return { data: response.data, status: response.status };
    } else {
      const response = await fetch(`${this._baseUrl}${url}`, {
        ...config,
        ...header,
        method: "PUT",
        body: typeof data === "string" ? data : JSON.stringify(data),
      });
      return this.handleResponse<T>(response);
    }
  }

  static async patch<T = unknown>(
    url: string,
    data: unknown,
    header?: RequestInit
  ): Promise<{ data: T; status: number }> {
    if (this._adapter === "axios") {
      const response = await axios.patch<T>(`${this._baseUrl}${url}`, data, {
        ...config,
        ...header,
      } as Parameters<typeof axios.patch>[2]);
      return { data: response.data, status: response.status };
    } else {
      const response = await fetch(`${this._baseUrl}${url}`, {
        ...config,
        ...header,
        method: "PATCH",
        body: typeof data === "string" ? data : JSON.stringify(data),
      });
      return this.handleResponse<T>(response);
    }
  }

  static async delete<T = unknown>(
    url: string,
    header?: RequestInit
  ): Promise<{ data: T; status: number }> {
    if (this._adapter === "axios") {
      const response = await axios.delete<T>(`${this._baseUrl}${url}`, {
        ...config,
        ...header,
      } as Parameters<typeof axios.delete>[1]);
      return { data: response.data, status: response.status };
    } else {
      const response = await fetch(`${this._baseUrl}${url}`, {
        ...config,
        ...header,
        method: "DELETE",
      });
      return this.handleResponse<T>(response);
    }
  }
}
