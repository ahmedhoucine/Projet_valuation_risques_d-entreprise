import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrepriserisqueService {

  private apiUrl = 'http://localhost:8081/api/entreprise-risque';

  constructor(private http: HttpClient) {}

  getEntrepriseRisque(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getEntrepriseRisques(entreprise_id:any): Observable<any[]> {
    const url = `${this.apiUrl}/${entreprise_id}/risque`;
    return this.http.get<any[]>(url);
  }

  addEntrepriseRisque(entrepriserisque: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, entrepriserisque);
  }

  deleteAllRisque(entreprise_id:any): Observable<any>{
    const url = `${this.apiUrl}/${entreprise_id}`;
    return this.http.delete<void>(url);
  }

  
}
