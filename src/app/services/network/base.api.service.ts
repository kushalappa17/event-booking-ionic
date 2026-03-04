import { ApiService } from "./api-service";

export abstract class BaseApiService<T> {

  protected abstract endpoint: string;

  constructor(protected api: ApiService) {}

  getAll(params?: any) {
    return this.api.get<T[]>(this.endpoint, params);
  }

  getById(id: number) {
    return this.api.get<T>(`${this.endpoint}/${id}`);
  }

  create(body: T) {
    return this.api.post<T>(this.endpoint, body);
  }

  update(id: number, body: T) {
    return this.api.put<T>(`${this.endpoint}/${id}`, body);
  }

  delete(id: number) {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }
}