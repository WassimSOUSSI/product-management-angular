import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/shared-services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public loginService:LoginService, private route:Router) { }

  ngOnInit(): void {
  }

  public handleLogout(){
    this.loginService.logout().subscribe({
      next : (data) =>{
        this.route.navigateByUrl("");
      }
    })
  }

}
