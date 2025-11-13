import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

// Importações dos componentes Ionic Standalone
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonSpinner, IonItem, IonLabel, IonList, IonImg
} from '@ionic/angular/standalone';

// Importações do Serviço e das Interfaces
import { ApiService, PlaceDetails, Photo, Review } from '../components/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [ // Lista de imports
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    IonSpinner, IonItem, IonLabel, IonList, IonImg
  ]
})
export class DetailsPage implements OnInit {

  private route = inject(ActivatedRoute);
  private api = inject(ApiService); // O serviço do Gustavo

  public localDetalhes: PlaceDetails | null = null;
  public isLoading = true;
  public photoUrl: string | null = null; // Variável para a URL da foto

  constructor() { }

  ngOnInit() {
    // Pega o 'id' da URL (Req. 7)
    const placeId = this.route.snapshot.paramMap.get('id');

    if (placeId) {
      // Chama a segunda função do Gustavo
      this.api.getEventById(placeId).subscribe({
        next: (detalhes: PlaceDetails) => {
          this.localDetalhes = detalhes;
          this.isLoading = false;

          // LÓGICA DA FOTO
          if (detalhes.photos && detalhes.photos.length > 0) {
            const photoRef = detalhes.photos[0].photo_reference;
            // Chama a função 'getPhotoURL' do Gustavo para construir a URL
            this.photoUrl = this.api.getPhotoURL(photoRef);
          }
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