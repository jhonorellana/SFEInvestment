import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashflowPageComponent } from './cashflow-page.component';

describe('CashflowPageComponent', () => {
  let component: CashflowPageComponent;
  let fixture: ComponentFixture<CashflowPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CashflowPageComponent]
    });
    fixture = TestBed.createComponent(CashflowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
