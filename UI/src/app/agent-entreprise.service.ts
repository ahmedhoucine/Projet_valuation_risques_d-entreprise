import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentEntrepriseService {

  private baseUrl = 'http://localhost:8081/agent-entreprise';

  constructor(private http: HttpClient) { }

  deleteAllAgentEntreprisesByEntrepriseId(entrepriseId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/by-entreprise/${entrepriseId}`);
  }
  saveResponse(response: any): Observable<any> {
    return this.http.post(this.baseUrl, response);
  }
  getAgentsByEntreprise(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/by-entreprise/${id}`);
  }

}
