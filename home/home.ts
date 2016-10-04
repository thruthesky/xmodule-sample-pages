import { Component } from '@angular/core';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { PasswordPage } from '../password/password';
import { ResignPage } from '../resign/resign';
import { NavController, Events } from 'ionic-angular';
import * as xi from '../../xmodule/interfaces/xapi';
import { Xapi } from '../../xmodule/providers/xapi';
@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  appTitle = "Hello World!";
  user: xi.UserLoginData;
  constructor(
    private navCtrl: NavController,
    private events: Events,
    private x: Xapi ) {
      this.x.getLoginData( x => this.login(x) );
    //this.navCtrl.push( Login );
    //this.navCtrl.push( RegisterPage );
    //this.navCtrl.push( PasswordPage );

    this.events.subscribe( 'logout', () => {
      console.log('HomePage::constructor::event logout');
      this.logout();
    });
    this.events.subscribe( 'resign', () => {
      console.log('HomePage::constructor::event resign');
      this.logout();
    });
    this.events.subscribe( 'login', (x) => {
      console.log('HomePage::constructor::event logout');
      this.login(x);
    });
    this.events.subscribe( 'register', x => {
      console.log('HomePage::constructor::event register');
      this.login(x);
    });
  }
  login( u: xi.UserLoginData ) {
    this.user = u;
  }
  logout() {
    this.user = '';
  }
  onClickLogin() {
    console.log('onClickLogin()');
    this.navCtrl.push( LoginPage );
  }
  onClickLogout() {
        this.x.logout();
        this.x.alert("로그아웃", "로그아웃하였습니다.");
        this.logout();
  }
  onClickRegister() {
    this.navCtrl.push( RegisterPage );
  }
  onClickUpdate() {
    this.navCtrl.push( RegisterPage );
  }
  onClickChangePassword() {
    this.navCtrl.push( PasswordPage );
  }
  onClickResign() {
    this.navCtrl.push( ResignPage );
  }
}