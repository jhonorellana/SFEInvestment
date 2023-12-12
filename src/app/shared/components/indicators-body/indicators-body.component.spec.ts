import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorsBodyComponent } from './indicators-body.component';

describe('IndicatorsBodyComponent', () => {
  let component: IndicatorsBodyComponent;
  let fixture: ComponentFixture<IndicatorsBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndicatorsBodyComponent]
    });
    fixture = TestBed.createComponent(IndicatorsBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
