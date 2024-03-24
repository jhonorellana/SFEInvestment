import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonoshisPageComponent } from './bonoshis-page.component';

describe('BonoshisPageComponent', () => {
  let component: BonoshisPageComponent;
  let fixture: ComponentFixture<BonoshisPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BonoshisPageComponent]
    });
    fixture = TestBed.createComponent(BonoshisPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
