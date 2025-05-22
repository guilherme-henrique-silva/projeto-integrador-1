import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private LOGIN_URL = "http://localhost:3000/api/login"

  constructor(private httpClient: HttpClient) { }

  registrar(data: any): Observable<any> {

    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/json');

    // if (token) {
    //   headers = headers.set('Authorization', `Bearer ${token}`);
    // }

    const options = { headers: headers };

    return this.httpClient.post(this.LOGIN_URL, data, options)
  }
}
