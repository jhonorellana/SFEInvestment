import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharesPageComponent } from './shares-page.component';

describe('SharesPageComponent', () => {
  let component: SharesPageComponent;
  let fixture: ComponentFixture<SharesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharesPageComponent]
    });
    fixture = TestBed.createComponent(SharesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
