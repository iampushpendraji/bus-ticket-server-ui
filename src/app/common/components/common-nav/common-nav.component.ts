import { Component, OnInit, inject, signal, viewChild } from '@angular/core';
import { AuthApiService } from '../../../auth/services/auth-api.service';
import { AuthHelperService } from '../../../auth/services/auth-helper.service';
import { DataTransferService } from '../../services/data-transfer.service';
import { Router } from '@angular/router';
import { AuthCookie } from '../../../auth/interfaces/auth-interface';
import { ConfirmBoxComponent } from '../confirm-box/confirm-box.component';

@Component({
  selector: 'app-common-nav',
  standalone: true,
  imports: [ConfirmBoxComponent],
  templateUrl: './common-nav.component.html',
  styleUrl: './common-nav.component.css'
})
export class CommonNavComponent {
  _authApiService = inject(AuthApiService);
  _authApiHelperServce = inject(AuthHelperService);
  _dataTransferService = inject(DataTransferService);
  _router: Router = inject(Router);

  userInfo: AuthCookie = JSON.parse(this._authApiHelperServce.getCookies('auth-bus-ticket'));

  modalHeader = signal<string>("Logout");
  modalBody = signal<string>("Are you sure you want to log out ?");
  modalSbmitButtonName = signal<string>("Log Out");
  modalSubmitColor = signal<"danger" | "success" | "primary">("danger");
  modalLoading = signal<boolean>(false);

  _confirmBoxComponent = viewChild.required(ConfirmBoxComponent);


  // Signing out user from current device
  signOut(): void {
    let obj = {
      refresh_token: this.userInfo.refresh_token,
      access_token: this.userInfo.access_token
    }
    this._authApiService.signOut(obj).subscribe({
      next: () => {
        this._authApiHelperServce.deleteCookies('auth-bus-ticket');
        this._router.navigateByUrl('/');
        this.logOutModalClose();
      },
      error: err => {
        this.logOutModalClose();
        if (!err.hasOwnProperty('error')) return this._dataTransferService.sendNotification(false, err?.message);
        else return this._dataTransferService.sendNotification(false, err?.error?.message);
      }
    });
  }


  // Signing out user from all the device
  signOutAllDevices(): void {
    let obj = {
      refresh_token: this.userInfo.refresh_token,
      access_token: this.userInfo.access_token
    }
    this._authApiService.signOutAll(obj).subscribe({
      next: () => {
        this._authApiHelperServce.deleteCookies('auth-bus-ticket');
        this._router.navigateByUrl('/');
        this.logOutModalClose();
      },
      error: err => {
        this.logOutModalClose();
        if (!err.hasOwnProperty('error')) return this._dataTransferService.sendNotification(false, err?.message);
        else return this._dataTransferService.sendNotification(false, err?.error?.message);
      }
    });
  }


  // For handling open confirm box for logout and logout all
  logOutModalOpen(from: string): void {
    this.modalHeader.set(from);
    this.modalBody.set(from == 'Logout' ? 'Are you sure you want to log out ?': 'Are you sure you want to log out from all devices ?')
    this.modalSbmitButtonName.set(from);
    this._confirmBoxComponent().showModal();
  }


  // For handling open confirm box for logout and logout all
  logOutModalClose(): void {
    this._confirmBoxComponent().hideModal();
  }


  // For handling confirm click in delete modal 
  onDeleteModalConfirmClick(): void {
    if (this.modalHeader() == 'Logout') this.signOut();
    else if (this.modalHeader() == 'Logout All') this.signOutAllDevices();
    else this.signOut();
  }

}
