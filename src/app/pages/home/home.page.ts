import { Component } from '@angular/core';
import { NavController } from "@ionic/angular";

import { UserDetailService } from "../../services/user-detail.service";
import { ApiService } from "../../services/api.service";
import { Booking } from "../../type/booking";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  adminEmail: string = 'testapis@tuten.cl';
  userEmail:  string = 'contacto@tuten.cl';
  token: string;
items = [];
  booking: Booking ;
  bookings = [];
searchText: string =''
  constructor(
    private api: ApiService,
    public navCtrl: NavController,
    public userDetailService: UserDetailService
   
    ) {
    this.inicial()
    }

  getToken() {
    this.api.getAccessToken(this.adminEmail)
      .subscribe(data => {
        this.token = data['sessionTokenBck'];

        this.getUsersData();
    })
  }





  getUsersData() {
    this.api.getUsersData(this.userEmail, this.token)
      .subscribe(data => {
        this.processData(data);
      });
  }

  showInfo(user) {
    this.userDetailService.setData(user);
    this.navCtrl.navigateForward('/user-details');
    
    // let user =  this.bookings.filter(booking => booking.bookingId ==  bookingId)
    
    // this.router.navigate(['/user-details', user]);
  }

  processData(rawData: any) {
    for(let data of rawData ){

      this.booking              = new Booking();
      this.booking.bookingId    = data["bookingId"];
      this.booking.bookingTime  = data["bookingTime"];
      this.booking.bookingPrice = data["bookingPrice"];

      let bookingFields = JSON.parse(data["bookingFields"]);

      this.booking.firstName     = bookingFields["firstName"];
      this.booking.lastName      = bookingFields["lastName"];
      this.booking.streetAddress = bookingFields["location"]["streetAddress"];
    
      this.bookings.push(this.booking);
    
    }    
  }
  
  








inicial(){
  this.items=this.bookings
}





 
  getItems(ev: any) {
    // Reset items back to all of the items
    
this.inicial()
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (JSON.stringify(item.bookingId).toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }






















  ngOnInit() { this.getToken(); }
}
