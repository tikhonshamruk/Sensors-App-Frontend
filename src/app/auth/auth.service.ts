import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthInterface } from './auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(payload:{email:string, password: string}){
    return this.http.post<AuthInterface>(`http://localhost:8080/auth/sign-in`,payload)
  }

  autorization(payload:{name:string, password: string, email:string}){
    return this.http.post('http://localhost:8080/auth/sign-up', payload)
  }
}
