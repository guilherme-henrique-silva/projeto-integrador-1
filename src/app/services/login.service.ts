import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  error: string | null = null;
  success: boolean = false;
  private LOGIN_URL = "http://localhost:3000/api/login"

  constructor(private httpClient: HttpClient) { }

  login(data: any): Observable<any> {

    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/json');

    const options = { headers: headers };

    return this.httpClient.post(this.LOGIN_URL, data, options);
  }
}
