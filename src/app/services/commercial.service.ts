import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import { TokenService } from '@services/token.service';
import { checkToken } from '@interceptors/token.interceptor';
import { Advisor, ApiResponseCommercial } from '@models/commercial.model';

@Injectable({
  providedIn: 'root',
})
export class CommercialService {
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.tokenService.getToken()}`,
  });

  getAllCommercial() {
    return this.http.get<ApiResponseCommercial>(
      `${this.apiUrl}/api/v1/commercial/all`,
      {
        headers: this.headers,
      }
    );
  }

  createCommercial(CommercialData: Advisor) {
    return this.http.post<ApiResponseCommercial>(
      `${this.apiUrl}/api/v1/commercial/create`,
      {
        ...CommercialData,
      },
      {
        headers: this.headers,
      }
    );
  }

  updateCommercial(CommercialData: Advisor) {
    return this.http.put<ApiResponseCommercial>(
      `${this.apiUrl}/api/v1/commercial/update/${CommercialData._id}`,
      {
        ...CommercialData,
      },
      {
        headers: this.headers,
      }
    );
  }

  removeCommercial(commercialID: string) {
    return this.http.delete(
      `${this.apiUrl}/api/v1/commercial/remove/${commercialID}`,
      {
        headers: this.headers,
      }
    );
  }
}
