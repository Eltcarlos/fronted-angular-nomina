import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import { TokenService } from '@services/token.service';
import { checkToken } from '@interceptors/token.interceptor';
import { ApiResponseUser } from '@models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.tokenService.getToken()}`,
  });

  getAllUsers() {
    return this.http.get<ApiResponseUser>(`${this.apiUrl}/api/v1/user/all`, {
      headers: this.headers,
    });
  }
}
