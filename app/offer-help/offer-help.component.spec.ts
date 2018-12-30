import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferHelpComponent } from './offer-help.component';

describe('OfferHelpComponent', () => {
  let component: OfferHelpComponent;
  let fixture: ComponentFixture<OfferHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
