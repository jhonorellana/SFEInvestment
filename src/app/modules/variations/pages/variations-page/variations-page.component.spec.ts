import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationsPageComponent } from './variations-page.component';

describe('VariationsPageComponent', () => {
  let component: VariationsPageComponent;
  let fixture: ComponentFixture<VariationsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VariationsPageComponent]
    });
    fixture = TestBed.createComponent(VariationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
