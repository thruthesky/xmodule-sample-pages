import { Component } from '@angular/core';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { PasswordPage } from '../password/password';
import { ResignPage } from '../resign/resign';
import { ForumCategoryPage } from '../forum-category/forum-category';
import { PostListPage } from '../post-list/post-list';
//import { PostEditPage } from '../post-edit/post-edit';
import { PostEditDefaultPage } from '../../xmodule/pages/post/edit/default/post-edit-default';
import { NavController, Events } from 'ionic-angular';
import * as xi from '../../xmodule/interfaces/xapi';
import { Xapi } from '../../xmodule/providers/xapi';
import { PageController } from '../../xmodule/providers/page-controller';

@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  appTitle = "Hello World!";
  user: xi.UserLoginData;
  constructor(
    private navCtrl: NavController,
    private events: Events,
    private x: Xapi
    ) {
       this.x.getLoginData( x => this.login(x) );
      //this.login( x.userLoginData );
    //this.navCtrl.push( Login );
    //this.navCtrl.push( RegisterPage );
    //this.navCtrl.push( PasswordPage );
    //this.navCtrl.push( ForumCategoryPage );
    //this.navCtrl.push( PostEditPage ); // test
    
     //let page = ForumCategoryPage;
     let page = PostEditDefaultPage;
    setTimeout( ()=> this.navCtrl.push( page ), 800 );
    
    // 글 수정 페이지 이동.
//    setTimeout( ()=> this.navCtrl.push( PostEditPage, {'post_ID' : 322 }), 500 );
    
    
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




    x.serverUrl = "http://work.org/wordpress/index.php";

    // @todo remove PageController
    PageController.page.home = this;
    PageController.page.login = LoginPage;
    PageController.page.password = PasswordPage;
    PageController.page.resign = ResignPage;
    PageController.page.register = RegisterPage;
    PageController.page.postEdit = PostEditDefaultPage;
    
  }
  
  ionViewDidLoad() {
//    console.log("HomePage::ionViewDidLoad()");
  }
  login( u: xi.UserLoginData ) {
    this.user = u;
  }
  logout() {
    this.user = '';
  }
  onClickLogin() {
    console.log('onClickLogin()');
    //this.navCtrl.push( LoginPage );
    PageController.push( 'login', {} );   
  }
  onClickLogout() {
        this.x.logout();
        this.x.alert("로그아웃", "로그아웃하였습니다.");
        this.logout();
  }
  onClickRegister() {
    //this.navCtrl.push( RegisterPage );
    PageController.push( 'register', {} );   
  }
  onClickUpdate() {
    //this.navCtrl.push( RegisterPage );
    PageController.push( 'register' );   
  }
  onClickChangePassword() {
    //this.navCtrl.push( PasswordPage );
    PageController.push( 'password', {} );   
  }
  onClickResign() {
    //this.navCtrl.push( ResignPage );
    PageController.push( 'resign', {} );   
  }
  onClickCategory() {
    this.navCtrl.push( ForumCategoryPage );
  }
  onClickQnA() {
    this.navCtrl.push( PostListPage, {'slug':'qna'} );
  }
}
