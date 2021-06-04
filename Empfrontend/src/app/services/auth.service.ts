import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService  } from '@auth0/angular-jwt';
import {  HttpRequest,  HttpResponse } from "@angular/common/http";
import { Emplist } from '../services/emp.list';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  loginFlag : Boolean = false;
  employee: Emplist[];


  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) { }

  registerUser(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.httpClient.post('http://localhost:3000/users/register', user, httpOptions);
  }

  authenticateUser(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.httpClient.post('http://localhost:3000/users/authenticate', user, httpOptions);
  }

  getProfile() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: this.authToken,
      })
    };
    this.loadToken();
    return this.httpClient.get('http://localhost:3000/users/profile', httpOptions);
  }


  getEmp() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        
      })
    };
    
    return this.httpClient.get('http://localhost:3000/users/getemp', httpOptions);
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
   // return tokenNotExpired();

   this.loginFlag = true;
   this.authToken = this.loadToken();
        console.log(this.jwtHelper.isTokenExpired(this.authToken));
        return this.jwtHelper.isTokenExpired(this.authToken);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
