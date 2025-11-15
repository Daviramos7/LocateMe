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

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
    // Initial load with default city and no keywords
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
    this.search(); // Trigger search when keywords change
  }

  search() {
    const keywords = Array.from(this.selectedKeywords).join(' ');
    if (!this.cityQuery) {
      // Maybe show a message to the user to enter a city
      return;
    }
    this.carregarEventos(keywords || 'eventos', this.cityQuery); // if no keyword, search for 'eventos'
  }

  viewDetails(event: Place) {
    this.router.navigate(['/details', event.place_id]);
  }
}
