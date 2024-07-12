// file.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private apiUrl = 'http://localhost:8081'; // Update the URL to match your backend


  constructor(private http: HttpClient) { }

  readCsv(filename: string): Observable<any> {
    const endpoint = `${this.apiUrl}/read-csv?filename=${filename}`;
    return this.http.get<any>(endpoint);
  }
}
