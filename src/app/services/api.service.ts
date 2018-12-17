import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Booking } from '../type/booking';
import { Data } from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({
    'Accept':'application/json',
    'Content-Type': 'application/json',
    'App': 'APP_BCK'
  })
};
const API_URL = "https://dev.tuten.cl:443/TutenREST/rest/user";


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  dato: Data;

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.log(error);

      // Deja que la aplicación siga funcionando devolviendo un resultado vacío.
      return of(result as T);
    }
  }

  getAccessToken(email: string): Observable<any> {
    const URL = `${API_URL}/${email}`;
    httpOptions.headers =
      httpOptions.headers.append('Password', '1234');

    return this.http.put<[]>(URL, this.dato, httpOptions);
  }

  getUsersData(email: string, token: string) {    
    const URL = `${API_URL}/${email}/bookings?current=true`;
    httpOptions.headers =
      httpOptions.headers.append('adminemail', 'testapis@tuten.cl');
    httpOptions.headers =
      httpOptions.headers.append('token', token);

    // Delete header
    httpOptions.headers =
      httpOptions.headers.delete('Password');

    return this.http.get<[]>(URL, httpOptions);
  }
}
