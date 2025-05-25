import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TaskModel} from '../../core/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskApiRepository {
  private apiUrl = 'https://dummyjson.com';

  http = inject(HttpClient)
  // get simple
  getItems(): Observable<any> {
    let response = this.http.get<any[]>(`${this.apiUrl}/todos`);
    return response;
  }

  // get con params
  getItemById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/items/${id}`);
  }

  // get con HttpParams
  searchItems(query: string): Observable<any> {
    const params = new HttpParams().set('q', query);
    return this.http.get(`${this.apiUrl}/items/search`, {params});
  }

  // posti con body
  createItem(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/items`, data);
  }

  // pu para actualizar
  updateItem(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/items/${id}`, data);
  }

  // path para actualizar parcialmente
  patchItem(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/items/${id}`, data);
  }

  // deete
  deleteItem(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/items/${id}`);
  }

  // Con cabeceras personalizadas
  getWithHeaders(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer token');
    return this.http.get(`${this.apiUrl}/secure-data`, {headers});
  }
}
