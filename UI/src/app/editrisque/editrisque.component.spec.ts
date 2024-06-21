import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditrisqueComponent } from './editrisque.component';

describe('EditrisqueComponent', () => {
  let component: EditrisqueComponent;
  let fixture: ComponentFixture<EditrisqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditrisqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditrisqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
