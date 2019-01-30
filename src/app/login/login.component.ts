import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  form: FormGroup;
  
  constructor(private fb: FormBuilder, private authService: AuthService) {
    
    this.form = fb.group({
      email: [],
      password: []
    });

  }

  signIn(){
    let email = this.form.value.email;
    let password = this.form.value.password;
    
    this.authService.signInWithEmail(email, password);
  }

  signOut(){
    this.authService.logout();
  }


}
