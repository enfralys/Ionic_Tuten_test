import { Component } from '@angular/core';
import { ApiService } from "../services/api.service";
import { Booking } from "../type/booking";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  adminEmail: string = 'testapis@tuten.cl';
  userEmail:  string = 'contacto@tuten.cl';
  token: string;

  booking: Booking;
  bookings = [];

  constructor(private api: ApiService) {}

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

  ngOnInit() { this.getToken(); }
}
