import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Risque } from './risque.model';

@Injectable({
  providedIn: 'root'
})
export class RisqueService {

  private apiUrl = 'http://localhost:8081/api/risques';

  constructor(private http: HttpClient) { }

  getRisques(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getRisque(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  deleteRisque(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  addRisque(risque: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, risque);
  }

  updateRisque(risque: any): Observable<any> {
    const url = `${this.apiUrl}/${risque.risqueId}`;
    return this.http.put<any>(url, risque);
  }
  searchRisque(name: string): Observable<Risque[]> {
    return this.http.get<Risque[]>(`${this.apiUrl}/search?nom=${name}`);
  }
}
