import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyoverviewPageComponent } from './dailyoverview-page.component';

describe('DailyoverviewPageComponent', () => {
  let component: DailyoverviewPageComponent;
  let fixture: ComponentFixture<DailyoverviewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyoverviewPageComponent]
    });
    fixture = TestBed.createComponent(DailyoverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
