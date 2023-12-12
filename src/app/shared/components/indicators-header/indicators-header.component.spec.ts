import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorsHeaderComponent } from './indicators-header.component';

describe('IndicatorsHeaderComponent', () => {
  let component: IndicatorsHeaderComponent;
  let fixture: ComponentFixture<IndicatorsHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndicatorsHeaderComponent]
    });
    fixture = TestBed.createComponent(IndicatorsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
