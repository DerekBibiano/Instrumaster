import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-privacy-policy-modal',
  templateUrl: './privacy-policy-modal.component.html',
  styleUrls: ['./privacy-policy-modal.component.scss'],
})
export class PrivacyPolicyModalComponent {
  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }
}
