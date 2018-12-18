import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';

import { NavParams } from "@ionic/angular";

import { UserDetailService } from "../../services/user-detail.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {
  userInfo = {};
  
  constructor(
    private userDetailService: UserDetailService
  ) { 
    this.userInfo = this.userDetailService.getData();
    console.log(this.userInfo);
    
  }

  ngOnInit() {
  }

}
