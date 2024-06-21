import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrisqueComponent } from './addrisque.component';

describe('AddrisqueComponent', () => {
  let component: AddrisqueComponent;
  let fixture: ComponentFixture<AddrisqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddrisqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddrisqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
