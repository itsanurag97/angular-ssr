import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JSON_PLACEHOLDER_CONFIG } from '@core/config/external-app.config/json-placeholder/json-placeholder.config';
import { Post } from '../../external-api-services/models/json-placeholder.model';

@Injectable({
  providedIn: 'root'
})
export class JsonPlaceholderService {
  private http = inject(HttpClient);
  private config = JSON_PLACEHOLDER_CONFIG;

  getAllPosts(): Observable<Post[]> {
    const url = `${this.config.BASE_URL}${this.config.ENDPOINTS.POSTS}`;
    return this.http.get<Post[]>(url); 
  }

  getPostById(id: number): Observable<Post> {
    const url = `${this.config.BASE_URL}${this.config.ENDPOINTS.POSTS}/${id}`;
    return this.http.get<Post>(url);
  }
}