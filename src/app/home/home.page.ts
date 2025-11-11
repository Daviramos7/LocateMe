
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonButton,
  IonInput,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner
} from '@ionic/angular/standalone';

import { ApiService, Place } from '../components/api.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonButton,
    IonInput,
    IonList,
    IonItem,
    IonLabel,
    IonSpinner
  ],
})
export class HomePage {
  keywords: string = '';
  city: string = '';
  eventos: Place[] = [];
  carregando: boolean = false;

  constructor(private apiService: ApiService) {}

  buscarEventos() {
    if (!this.keywords || !this.city) {
      console.warn('⚠️ Preencha o tipo de evento e a cidade antes de buscar!');
      return;
    }

    this.carregando = true;

    this.apiService.getEventosByCity(this.keywords, this.city).subscribe({
      next: (res) => {
        this.eventos = res;
        console.log('Eventos encontrados:', this.eventos);
        this.carregando = false;
      },
      error: (err: any) => { // <-- tipo corrigido
        console.error('ERRO COMPLETO DA API:', err);
        this.carregando = false;
      }
    });
  }
}
