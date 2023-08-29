import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import { TokenService } from '@services/token.service';
import { checkToken } from '@interceptors/token.interceptor';
import {
  ApiResponseCommission,
  CommissionData,
} from '@models/commission.model';

@Injectable({
  providedIn: 'root',
})
export class CommissionService {
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.tokenService.getToken()}`,
  });

  getAllCommissions() {
    return this.http.get<ApiResponseCommission>(
      `${this.apiUrl}/api/v1/commission/all`,
      {
        headers: this.headers,
      }
    );
  }

  createCommissions(CommissionData: CommissionData) {
    return this.http.post<ApiResponseCommission>(
      `${this.apiUrl}/api/v1/commission/create`,
      {
        ...CommissionData,
      },
      {
        headers: this.headers,
      }
    );
  }

  updateCommissions(CommissionData: CommissionData) {
    return this.http.put<ApiResponseCommission>(
      `${this.apiUrl}/api/v1/commission/update/${CommissionData._id}`,
      {
        ...CommissionData,
      },
      {
        headers: this.headers,
      }
    );
  }

  removeCommissions(commissionID: string) {
    return this.http.delete(
      `${this.apiUrl}/api/v1/commission/remove/${commissionID}`,
      {
        headers: this.headers,
      }
    );
  }
}
