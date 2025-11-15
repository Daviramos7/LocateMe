  // api.service.ts
  import { Injectable } from '@angular/core';
  import { HttpClient, HttpParams } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { GCP_API_KEY } from '../../environments/environment.secrets';
  import { map } from 'rxjs/operators';

  // definimos o endpoint base para o Places API (Text Search para busca)
  const PLACES_API_URL = '/api/maps/api/place/textsearch/json';
  const PLACE_DETAILS_API_URL = '/api/maps/api/place/details/json';
  const PLACE_PHOTO_API_URL = '/api/maps/api/place/photo'
  // interfaces de Tipo para tipagem forte
  export interface Place {
    place_id: string;
    name: string;
    formatted_address: string;
    geometry: any; 
  }
  //interface que tem os atributos das fotos
  export interface Photo{
    photo_reference: string;
    height: number;
    width: number;
    html_attributions: string[]
  }
  // interface das reviews que são puxadas
  export interface Review{
    author_name: string;
    rating: number;
    relative_time_description: string;
    text: string;
  }
  export interface PlaceDetails {
    place_id: string;
    name: string;
    formatted_address: string;
    geometry: any;
    photos: Photo[]; 
    reviews: Review[];
  }

  interface TextSearchResponse {
    results: Place[];
    status: string;
  }

  interface DetailsResponse {
    result: PlaceDetails;
    status: string;
  }

  @Injectable({
    providedIn: 'root'
  })
  export class ApiService {

    constructor(private http: HttpClient) { }

    // funções principais de busca por cidade e id

    getEventosByCity(keywords: string, city: string): Observable<Place[]> {
      const query = `${keywords} em ${city}`;

      let params = new HttpParams()
        .set('query', query)
        .set('language', 'pt-BR')
        .set('key', GCP_API_KEY);

      return this.http.get<TextSearchResponse>(PLACES_API_URL, { params }).pipe(
        map(response => {
          if (response.status === 'OK' || response.status === 'ZERO_RESULTS') {
            return response.results || []; 
          } else {
            console.error('Places API Error:', response.status);
            throw new Error(`Erro na busca: ${response.status}`);
          }
        })
      );
    }

    getEventById(placeId: string): Observable<PlaceDetails> {
      //campos puxados na requisição
      //esses campos devem ser incrementados futuramente, sendo mantidos apenas os dados básicos por agora por estarmos na fase inicial
      //do desenvolvimento e querermos economizar em requisições.
      const fields = 'place_id,name,geometry,formatted_address,photos,reviews';
      
      let params = new HttpParams()
        .set('place_id', placeId)
        .set('fields', fields)
        .set('language', 'pt-BR')
        .set('key', GCP_API_KEY);

      return this.http.get<DetailsResponse>(PLACE_DETAILS_API_URL, { params }).pipe(
        map(response => {
          if (response.status === 'OK') {
            return response.result;
          } else {
            console.error('Place Details API Error:', response.status);
            throw new Error(`Erro ao buscar detalhes: ${response.status}`);
          }
        })
     );
    }
    
    getPhotoURL(photoReference: string, maxWidth: number = 1600): string {
      const params = new URLSearchParams ({
          'photo_reference' : photoReference,
          'maxwidth' : maxWidth.toString(),
          'key' : GCP_API_KEY
      });
      return `${PLACE_PHOTO_API_URL}?${params.toString()}`

    }
  }