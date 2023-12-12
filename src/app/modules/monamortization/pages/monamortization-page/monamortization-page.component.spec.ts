import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonamortizationPageComponent } from './monamortization-page.component';

describe('MonamortizationPageComponent', () => {
  let component: MonamortizationPageComponent;
  let fixture: ComponentFixture<MonamortizationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonamortizationPageComponent]
    });
    fixture = TestBed.createComponent(MonamortizationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
