import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CodeAuthService {
  private URL = "https://mymealsapp7.000webhostapp.com/index.php";

  constructor(private http: HttpClient) { }

  getCodesByUserCode(userCode: string) {
     return this.http.get(this.URL + "?action=getcodesbyusercode&usercode=" + userCode);
  }
}
