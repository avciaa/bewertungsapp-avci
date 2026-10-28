
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projects`);
  }

  getProject(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/projects/${id}`);
  }

  getEvaluations(projectId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/evaluations/project/${projectId}`
    );
  }

  getAverageRatings(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/statistik/projekte/durchschnitt`
    );
  }
}
