import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else localStorage.setItem('user', null);
    });
  }

  async signInWithEmail(email: string, password: string){
    
    await this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') 
          alert('Błędne hasło bądź email'); 
        else alert(errorMessage);
    }).then(() => {
      this.router.navigate(['#']);
    });
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user != null;
  }

}
