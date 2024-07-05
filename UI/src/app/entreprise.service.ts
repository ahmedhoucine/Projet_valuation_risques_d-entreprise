import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entreprise } from './entreprise.model';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  private apiUrl = 'http://localhost:8081/api/entreprise';

  constructor(private http: HttpClient) {}

  getEntreprise(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addEntreprise(entreprise: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, entreprise);
  }
  searchEntreprise(name: string): Observable<Entreprise> {
    return this.http.get<Entreprise>(`${this.apiUrl}/search?nom_legal=${name}`);
  }
  updatePourcentageRisque(id: number, pourcentagerisque: number): Observable<any> {
    const params = new HttpParams().set('pourcentagerisque', pourcentagerisque.toString());
    return this.http.put(`${this.apiUrl}/${id}/pourcentagerisque`, {}, { params });
  }
  deleteentreprise(id: number): Observable<any> {
    return this.http.get<Entreprise>(`${this.apiUrl}/${id}`);

  }
}

