import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/shared-services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  errorMessage!:string;

  constructor(private fb:FormBuilder, private loginService :LoginService, private route:Router) { 

  }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      user:this.fb.control(null),
      password:this.fb.control(null)
    })
  }

  public handleLogin(){
    let u=this.loginForm.value.user;
    let p=this.loginForm.value.password;
    this.loginService.Authentification(u,p).subscribe({
      next : (data) =>{
        this.route.navigateByUrl("/home");
      }, error : (err) => {
        this.errorMessage=err;
      }
    })
  }

}
