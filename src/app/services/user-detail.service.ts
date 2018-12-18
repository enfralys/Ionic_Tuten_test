import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
  private data: any;
  
  constructor() { }

  public setData(data) { this.data = data }

  getData() { return this.data }
}
