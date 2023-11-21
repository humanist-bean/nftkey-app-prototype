import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
//import { tokenNotExpired } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';
// ALDER NOTE: angular2-jwt was outdated so I made some changes to compensate
// for the new version of angular-jwt
const helper = new JwtHelperService();



@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  isDev: boolean;

  constructor(private http: HttpClient) {
      this.isDev = true;  // Change to false before deployment
      }

  registerUser(user: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers});
      //.map(res => res.json());
      // ALDER NOTE: above was commented out 
      // due to rxjs and HttpClient updates that made it unnessecary
  }

  authenticateUser(user: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers});
  }

  getProfile(): any { 
    this.loadToken();   
    
    const httpOptions: any = {
      headers: new HttpHeaders({
        //'Content-Type':  'application/json',
        Authorization: 'JWT '+ this.authToken
      })
    };
    
    //ALDER NOTE: ADDED COLONS TO THE BELOW TWO LINES, I THINK WRONG FORMATa
    // MIGHT BE CAUSING MY 401 ERROR
    //headers_auth.append('Authorization JWT ', this.authToken);                                                                        
    //headers.append('Content-Type ', 'application/json');

    //Alder Code here: added options up to date with http on angulars website
    // https://angular.io/guide/http
    console.log("The options: ", httpOptions, "\nThe headers: ", httpOptions.headers);
    return this.http.get('http://localhost:3000/users/profile', httpOptions);
  }

  storeUserData(token: any, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    // ALDER TESTING HERE
    console.log("Here the token in angular's auth.service.ts loadToken(): ", token);
    this.authToken = token;
  }

  loggedIn() {
    const refreshToken: any = localStorage.getItem('id_token');
    console.log("The value of isTokenExpired in authService is: ", helper.isTokenExpired(refreshToken));
    return !(helper.isTokenExpired(refreshToken)); // alder made changes here
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
