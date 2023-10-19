import { RouteService } from './../services/route.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  tourGuideCode:string = '';
  constructor(private service:AuthService,private routess:RouteService) { }

  ngOnInit(): void {
  }
  validateTourGuideCode() {
    if(this.service.login("TG@2022")) {
       this.routess.navigateToTourRequestsView();
      }else{
        alert("Please enter valid tour guide code");
      }
       }

}
