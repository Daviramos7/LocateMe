import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';


import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonSpinner,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';

import { ActivatedRoute } from '@angular/router'; 


import { ApiService, PlaceDetails } from '../components/api.service'; 

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonSpinner,
    IonItem,
    IonLabel
  ]
})
export class DetailsPage implements OnInit {
  
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);

  public localDetalhes: PlaceDetails | null = null;
  public isLoading = true;

  constructor() {}

  ngOnInit() {
    const placeId = this.route.snapshot.paramMap.get('id');

    if (placeId) {
      this.api.getEventById(placeId).subscribe({
        

        next: (detalhes: PlaceDetails) => {
          this.localDetalhes = detalhes;
          this.isLoading = false;
        },

        error: (err: any) => {
          console.error('Erro ao buscar detalhes:', err);
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = false;
      console.error('Nenhum ID de local foi passado na rota.');
    }
  }
}