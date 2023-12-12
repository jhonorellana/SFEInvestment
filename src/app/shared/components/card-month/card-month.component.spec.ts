import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMonthComponent } from './card-month.component';

describe('CardMonthComponent', () => {
  let component: CardMonthComponent;
  let fixture: ComponentFixture<CardMonthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardMonthComponent]
    });
    fixture = TestBed.createComponent(CardMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
