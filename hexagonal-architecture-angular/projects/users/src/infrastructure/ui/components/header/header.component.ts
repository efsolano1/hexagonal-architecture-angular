import { Component, input } from '@angular/core';
import { IUserResponseDTO } from '../../../../domain/model/user.response.model';
import { IAuthResponseDTO } from '../../../../domain/model/auth.response.model';

@Component({
  selector: 'lib-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public user = input<IAuthResponseDTO>();

}
