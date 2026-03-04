import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly baseUrl = 'http://localhost:8083/api';

  constructor(private http: HttpClient) {}

  get<T>(url: string, params?: Record<string, any>): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${url}`, {
      params: this.buildParams(params)
    }).pipe(map(response => response));
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${url}`, body);
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${url}`, body);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${url}`);
  }

  private buildParams(params?: Record<string, any>): HttpParams {
    let httpParams = new HttpParams();

    if (!params) return httpParams;

    Object.keys(params).forEach(key => {
      const value = params[key];
      if (value !== null && value !== undefined) {
        httpParams = httpParams.set(key, value);
      }
    });

    return httpParams;
  }
}
