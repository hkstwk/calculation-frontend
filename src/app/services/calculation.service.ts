import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Provides this service in the root injector
})
export class CalculationService {
  private apiUrl = 'http://localhost:32010/interest/compound';

  constructor(private http: HttpClient) {}

  callApi(requestBody: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, requestBody);
  }
}
