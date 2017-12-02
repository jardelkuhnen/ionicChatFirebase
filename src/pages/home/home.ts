import { Chat } from './../../models/chat.model';
import { ChatService } from './../../providers/chat/chat.service';
import { ChatPage } from './../chat/chat';
import { AuthService } from './../../providers/auth/auth.service';
import { UserService } from './../../providers/user/user.service';
import { User } from './../../models/user.model';
import { FirebaseListObservable } from 'angularFire2';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import firebase from 'firebase';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  chats: FirebaseListObservable<Chat[]>;
  users: FirebaseListObservable<User[]>;
  view: string = 'chats';

  constructor(
    public authService: AuthService,
    public navCtrl: NavController,
    public userService: UserService,
    public chatService: ChatService) {

  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.chats = this.chatService.chats;
    this.users = this.userService.users;
  }

  onChatCreate(recipientuser: User): void {

    this.userService.currentUser
      .first()
      .subscribe((currentuser: User) => {

        this.chatService.getDeepChat(currentuser.$key, recipientuser.$key)
          .first()
          .subscribe((chat: Chat) => {

            if (chat.hasOwnProperty('$value')) {

              let timestamp: Object = firebase.database.ServerValue.TIMESTAMP;

              //Criando chat para o primeiro usuario
              let chat1 = new Chat('', timestamp, recipientuser.name, '');
              this.chatService.create(chat1, currentuser.$key, recipientuser.$key);

              //Criando chat para o segundo usuário
              let chat2 = new Chat('', timestamp, currentuser.name, '');
              this.chatService.create(chat2, recipientuser.$key, currentuser.$key);


            }

          });

      });


    this.navCtrl.push(ChatPage, {
      recipientUser: recipientuser
    });

  }

  onSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  onChatOpen(chat: Chat): void {

    let recipientUserId: string = chat.$key;

    this.userService.getUser(recipientUserId)
      .first()
      .subscribe((user: User) => {
        this.navCtrl.push(ChatPage, {
          recipientUser: user
        });

      });

  }

}
