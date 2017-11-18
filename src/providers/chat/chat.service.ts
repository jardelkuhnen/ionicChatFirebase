import { AngularFire } from 'angularFire2';
import { Chat } from './../../models/chat.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseService } from '../base.service';


@Injectable()
export class ChatService extends BaseService {

  constructor(
    public af: AngularFire,
    public http: Http
  ) {
   super();
  }

  create(chat: Chat, userId1: string, userId2:string): firebase.Promise<void>{
    return this.af.database.object(`/chats/${userId1}/${userId2}`)
    .set(chat)
    .catch(this.handlePromiseError);  
  }

}