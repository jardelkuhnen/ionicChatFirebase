import { ChatPage } from './../chat/chat';
import { AuthService } from './../../providers/auth/auth.service';
import { UserService } from './../../providers/user/user.service';
import { User } from './../../models/user.model';
import { FirebaseListObservable } from 'angularFire2';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: FirebaseListObservable<User[]>;
  view: string = 'chats';

  constructor(
    public authService: AuthService,
    public navCtrl: NavController,
    public userService: UserService) {

  }

  ionViewCanEnter(): Promise<boolean>{
      return this.authService.authenticated;
  }

  ionViewDidLoad(){
    this.users = this.userService.users;
  }

  onChatCreate(user: User): void{
    console.log('Chat com o usuario', user);

    this.navCtrl.push(ChatPage, {
      recipientUser: user
    });

  }

  onSignup(): void {
    this.navCtrl.push(SignupPage);
  }

}
