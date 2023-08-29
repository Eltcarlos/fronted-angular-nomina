import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import { TokenService } from '@services/token.service';
import { checkToken } from '@interceptors/token.interceptor';
import { ApiResponsePayroll } from '@models/payroll.model';

@Injectable({
  providedIn: 'root',
})
export class PayrollService {
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.tokenService.getToken()}`,
  });

  getAllPayroll() {
    return this.http.get<ApiResponsePayroll>(
      `${this.apiUrl}/api/v1/payroll/all`,
      {
        headers: this.headers,
      }
    );
  }

  createPayroll(Commercial: any) {
    return this.http.post<ApiResponsePayroll>(
      `${this.apiUrl}/api/v1/payroll/create`,
      {
        ...Commercial,
      },
      {
        headers: this.headers,
      }
    );
  }
}
