import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-sso-login',
  standalone: true,
  imports: [],
  templateUrl: './sso-login.component.html',
  styleUrl: './sso-login.component.css'
})
export class SsoLoginComponent {


  // For handling signin using SSO
  ssoSignInHandler(provider: string): void {
    let url = ``;

    if(provider == 'google') url = `${environment.apiUrl}/auth/${environment.apiVersion}/sign_in_sso_google`;
    
    window.location.href = url;
  }

}
