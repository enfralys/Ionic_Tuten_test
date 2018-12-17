import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {
  info = {};
  
  constructor(
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
  }

}
