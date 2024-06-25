import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatentrepriseComponent } from './resultatentreprise.component';

describe('ResultatentrepriseComponent', () => {
  let component: ResultatentrepriseComponent;
  let fixture: ComponentFixture<ResultatentrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultatentrepriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultatentrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
