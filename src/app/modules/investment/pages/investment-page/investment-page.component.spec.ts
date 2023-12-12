import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentPageComponent } from './investment-page.component';

describe('InvestmentPageComponent', () => {
  let component: InvestmentPageComponent;
  let fixture: ComponentFixture<InvestmentPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentPageComponent]
    });
    fixture = TestBed.createComponent(InvestmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
