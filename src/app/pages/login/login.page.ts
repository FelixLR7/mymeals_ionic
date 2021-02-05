import { Plugins } from '@capacitor/core';
import "@codetrix-studio/capacitor-google-auth";
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userData: any = {};
  constructor() { }

  ngOnInit() {
  }

  async login() {
    let test = await Plugins.GoogleAuth.signIn();
    console.log(test);
  }
}