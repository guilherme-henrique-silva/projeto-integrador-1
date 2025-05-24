import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  error: string | null = null;
  success: boolean = false;
  private REGISTER_URL = "http://localhost:3000/api/register"

  constructor(private httpClient: HttpClient) { }

  registrar(data: any): Observable<any> {

    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/json');

    const options = { headers: headers };

    return this.httpClient.post(this.REGISTER_URL, data, options);
  }
}
