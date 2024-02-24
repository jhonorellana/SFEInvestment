import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthervaluePageComponent } from './othervalue-page.component';

describe('OthervaluePageComponent', () => {
  let component: OthervaluePageComponent;
  let fixture: ComponentFixture<OthervaluePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OthervaluePageComponent]
    });
    fixture = TestBed.createComponent(OthervaluePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
