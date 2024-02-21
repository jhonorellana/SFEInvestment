import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationregisterPageComponent } from './variationregister-page.component';

describe('VariationregisterPageComponent', () => {
  let component: VariationregisterPageComponent;
  let fixture: ComponentFixture<VariationregisterPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VariationregisterPageComponent]
    });
    fixture = TestBed.createComponent(VariationregisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
