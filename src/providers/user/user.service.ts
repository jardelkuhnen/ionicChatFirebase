import { User } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from 'angularFire2';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';

@Injectable()
export class UserService extends BaseService{

  users: FirebaseListObservable<User[]>;

  constructor(
    public af: AngularFire,
    public http: Http 
    ) {
      super();
      this.users = this.af.database.list(`/users`);
  }
  
  create(user: User, uuid: string): firebase.Promise<void>{
      return this.af.database.object(`/users/${uuid}`).set(user).catch(this.handlePromiseError);
  }

  userExists(userName: string): Observable<boolean>{
     return this.af.database.list(`/users`, {
        query: {
          orderByChild: 'username',
          equalTo: userName
        } 
    }).map((users: User[])=> {
        return users.length > 0;
    }).catch(this.handleObservableError);
   
  }

}
