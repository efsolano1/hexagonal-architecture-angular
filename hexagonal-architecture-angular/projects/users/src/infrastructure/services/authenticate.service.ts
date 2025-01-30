import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { IUserRequestDTO } from '../../domain/model/user.request.model';
import { IUserResponseDTO } from '../../domain/model/user.response.model';
import { IAuthResponseDTO } from '../../domain/model/auth.response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  private http = inject(HttpClient);
  private tokenKey = 'authToken';
  private apiUrl = 'http://localhost:8080';

  constructor() {}

  // register(user: IUserRequestDTO): Observable<IUserResponseDTO> {
  //   return this.http.post<IUserResponseDTO>(
  //     `${this.apiUrl}/user/register`,
  //     user
  //   );
  // }

  login(user: IUserRequestDTO): Observable<IAuthResponseDTO> {
    return this.http.post<IAuthResponseDTO>(`${this.apiUrl}/user/login`, user);
  }

}
