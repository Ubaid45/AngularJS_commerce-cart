import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AppUser } from 'shared/models/app-user';

@Injectable()
export class UserService {
  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    // Using update() not set() to avoid overwriting everytime the user logins
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): Observable<AppUser> {
    return this.db.object<AppUser>('/users/' + uid).valueChanges();
  }
}
