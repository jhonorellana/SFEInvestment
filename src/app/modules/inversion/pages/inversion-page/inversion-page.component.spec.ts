import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InversionPageComponent } from './inversion-page.component';

describe('InversionPageComponent', () => {
  let component: InversionPageComponent;
  let fixture: ComponentFixture<InversionPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InversionPageComponent]
    });
    fixture = TestBed.createComponent(InversionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
