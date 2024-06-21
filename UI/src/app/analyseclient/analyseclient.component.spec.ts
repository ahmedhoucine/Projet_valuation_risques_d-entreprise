import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseclientComponent } from './analyseclient.component';

describe('AnalyseclientComponent', () => {
  let component: AnalyseclientComponent;
  let fixture: ComponentFixture<AnalyseclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyseclientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyseclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
