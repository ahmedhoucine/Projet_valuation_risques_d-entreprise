import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RisquelistComponent } from './risquelist.component';

describe('RisquelistComponent', () => {
  let component: RisquelistComponent;
  let fixture: ComponentFixture<RisquelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RisquelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RisquelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
