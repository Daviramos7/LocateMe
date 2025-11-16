    import { Routes } from '@angular/router';

    export const routes: Routes = [
  {
    path: 'home',
    // carregamento mais dinâmico (lazy loading) da homepage
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'details/:id', 
    loadComponent: () => import('./details/details.page').then((m) => m.DetailsPage),
   },
];

  //  atividade da semana 3: página de detalhes
  // o ":id" captura o place_id (id do local/evento)
  // e envia para o componente DetailsPage.