import { NgClass } from '@angular/common';
import { Component, OnInit, input, model, output } from '@angular/core';
import { Modal } from 'bootstrap';


@Component({
  selector: 'app-confirm-box',
  standalone: true,
  imports: [NgClass],
  templateUrl: './confirm-box.component.html',
  styleUrl: './confirm-box.component.css'
})


export class ConfirmBoxComponent implements OnInit {
  isModalLoading = model<boolean>();
  modalHeader = input.required<string>();
  modalBody = input.required<string>();
  submitButtonName = input.required<string>();
  requireApiCall = input.required<boolean>();
  submitColor = input.required<"danger" | "success" | "primary">();

  confirmBoxModal: Modal | undefined;

  onConfirmClick = output<void>();


  ngOnInit(): void {
    this.confirmBoxModal = new Modal('#confirm-box-modal'); // Initializing modal element
  }


  // Showing forgot password modal, We are calling it from parent component
  showModal(): void {
    this.confirmBoxModal?.show();
  }


  // Confirm or submit click handler
  onConfirm(): void {
    if(this.requireApiCall()) { // If this modal is dependant on any api call or time taking process
      this.isModalLoading.set(true);  // We will off this loading button from parent component
      this.onConfirmClick.emit();
    } else {
      this.onConfirmClick.emit();
    }
  }


  // Hiding forgot password modal
  hideModal(): void {
    this.isModalLoading.set(false);
    this.confirmBoxModal?.hide();
  }


}
