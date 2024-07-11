import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8081/run-python';

  constructor(private http: HttpClient) { }

  runPythonScript(scriptPath: string, args: string) {
    const params = {
      scriptPath: scriptPath,
      args: args
    };
    return this.http.get<any>(this.apiUrl, { params });
  }
}
