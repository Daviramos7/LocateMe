import { ComponentFixture, TestBed } from '@angular/core/testing'; // ARQUIVO DE TESTE DO DETAILS.PAGE
import { DetailsPage } from './details.page';

describe('DetailsPage', () => {
  let component: DetailsPage;
  let fixture: ComponentFixture<DetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
