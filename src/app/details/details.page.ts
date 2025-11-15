import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

// aqui são as importações dos componentes ionic standalone
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonSpinner, IonItem, IonLabel, IonList, IonImg
} from '@ionic/angular/standalone';

// importações do serviço e das interfaces
import { ApiService, PlaceDetails, Photo, Review } from '../components/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [ // lista de imports dos componentes ionic
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    IonSpinner, IonItem, IonLabel, IonList, IonImg
  ]
})
export class DetailsPage implements OnInit {

  private route = inject(ActivatedRoute);
  private api = inject(ApiService); // a atividade realizada serviço de Gustavo
  public localDetalhes: PlaceDetails | null = null;
  public isLoading = true;
  public photoUrl: string | null = null; // variável para a URL da foto

  constructor() { }

  ngOnInit() {
    // pega o 'id' da URL (Req. 7)
    const placeId = this.route.snapshot.paramMap.get('id');

    if (placeId) {
      // chama a segunda função de Gustavo
      this.api.getEventById(placeId).subscribe({
        next: (detalhes: PlaceDetails) => {
          this.localDetalhes = detalhes;
          this.isLoading = false;

          // lógica da foto em questão
          if (detalhes.photos && detalhes.photos.length > 0) {
            const photoRef = detalhes.photos[0].photo_reference;
            // chama a função 'getPhotoURL' de Gustavo ( que ficou responsável pela API e sua arquitetura) para construir a URL
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