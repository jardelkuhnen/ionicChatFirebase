import { AuthService } from './../../providers/auth/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  messages: string[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthService
  ) {
  }

  ionViewCanEnter(): Promise<boolean>{
      return this.authService.authenticated;
  }

  sendMessage(newMessage: string): void{
    console.log(newMessage);
     this.messages.push(newMessage); 
  }


}
