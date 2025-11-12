import { TruncatePipe } from '../pipes/truncate.pipe';
import { RouterModule } from '@angular/router';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner,
  IonButton,
  IonItemOption,
  IonListHeader
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
    TruncatePipe,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonList,
    IonItem,
    IonLabel,
    IonSpinner,
    IonButton,
    IonItemOption,
    IonListHeader
  ],
})
export class HomePage {
  keywords: string = '';
  city: string = '';
  eventos: Place[] = [];
  carregando: boolean = false;

  private apiService = inject(ApiService);
  constructor() {}

  buscarEventos() {
    if (!this.keywords || !this.city) {
      console.warn('⚠️ Preencha o tipo de evento e a cidade antes de buscar!');
      return;
    }

    this.carregando = true;
    this.eventos = [];

    this.apiService.getEventosByCity(this.keywords, this.city).subscribe({
      next: (res: Place[]) => {
        this.eventos = res;
        console.log('Eventos encontrados:', this.eventos);
        this.carregando = false;
      },
      error: (err: any) => { 
        console.error('ERRO COMPLETO DA API:', err);
        this.carregando = false;
      }
    });
  }
}