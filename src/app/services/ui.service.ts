import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular'; 

@Injectable({
  providedIn: 'root',
})
export class UIService {
 
  constructor(private toastController: ToastController) {}

  async showError(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      position: 'bottom',
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });

    await toast.present();
  }

  async showSuccess(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });

    await toast.present();
  }
}
