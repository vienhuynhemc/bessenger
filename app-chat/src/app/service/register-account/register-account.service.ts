import { RegisterObjectSendMail } from './../../models/regiser-account/register_object_send_mail';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RegisterAccountService {

  private REST_API_SERVER = "https://bessenger.000webhostapp.com";

  constructor(private httpClient: HttpClient) { }

  public sendMail(data:RegisterObjectSendMail): Observable<any> {
    const url = `${this.REST_API_SERVER}/sendEmail.php?code=${data.code}&&email=${data.email}`;
    return this.httpClient
      .get<any>(url);
  }

}
