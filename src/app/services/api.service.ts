import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class API {
  private URL = environment.URL;

  constructor(private http: HttpClient) { }

  login() {
      let data = { 
        "email" : "felix@gmail.com",
        "password" : "123"
    };

      return this.http.post(this.URL + "/login", data);
  }

  getUser() {
    return this.http.get(this.URL + "/user");
  }
}
