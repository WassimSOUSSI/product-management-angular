import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { empty, Observable, of, throwError } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService{

  users!:Array<User>;
  connectedUser:User | undefined;

  constructor() {
    this.users=new Array<User>;
    this.users.push(new User(UUID.UUID(),"user","123","USER"));
    this.users.push(new User(UUID.UUID(),"user_1","1234","USER"));
    this.users.push(new User(UUID.UUID(),"user_2","12345","USER"));
    this.users.push(new User(UUID.UUID(),"admin","admin","ADMIN"));
   }

   public Authentification (user:string,pass:string):Observable<boolean>{
    let u=this.users.filter(u=>u.userName==user && u.password==pass);
    if (u.length!=0) {
      this.connectedUser=u[0];
      return of(true);
    }else{
      return throwError(()=>new Error("User or Password don't exsist !!!"));
    }
   }

   public Role(role:string):boolean{
    if (this.connectedUser!.role==role) {
      return true;
    }else{
      return false;
    }
   }

   public logout():Observable<boolean>{
    this.connectedUser=undefined;
    return of(true);
  }
}
