import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonList,
  IonSpinner,
  IonItem,
  IonSearchbar,
  IonButton,
} from '@ionic/angular/standalone';
import { ApiService, Place } from '../components/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// CORREÇÃO: O caminho correto para a sua diretiva dentro da pasta 'shared'.
import { HoverHighlightDirective } from '../shared/hover-highlight.directive'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    // Componentes Ionic
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonItem,
    IonIcon,
    IonSpinner,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonSearchbar,
    IonButton,
    // ADIÇÃO: Incluindo a diretiva para que o HTML a reconheça.
    HoverHighlightDirective, 
  ],
})
export class HomePage implements OnInit {
  events: Place[] = [];
  isLoading: boolean = false;
  cityQuery: string = 'São Paulo'; // Default city
  categories: string[] = ['Bares', 'Shows', 'Museus', 'Cafeterias', 'Parques', 'Restaurantes', 'Teatros', 'Baladas'];
  selectedKeywords: Set<string> = new Set();

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.search();
  }

  carregarEventos(keywords: string, city: string) {
    this.isLoading = true;
    this.apiService.getEventosByCity(keywords, city).subscribe({
      next: (dados) => {
        this.events = dados;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar eventos:', err);
        this.isLoading = false;
      }
    });
  }

  toggleKeyword(keyword: string) {
    if (this.selectedKeywords.has(keyword)) {
      this.selectedKeywords.delete(keyword);
    } else {
      this.selectedKeywords.add(keyword);
    }
    this.search();
  }

  search() {
    const keywords = Array.from(this.selectedKeywords).join(' ');
    if (!this.cityQuery) {
      return;
    }
    this.carregarEventos(keywords || 'eventos', this.cityQuery);
  }

  viewDetails(event: Place) {
    this.router.navigate(['/details', event.place_id]);
  }
}
