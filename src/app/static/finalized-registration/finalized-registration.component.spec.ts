import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizedRegistrationComponent } from './finalized-registration.component';

describe('FinalizedRegistrationComponent', () => {
  let component: FinalizedRegistrationComponent;
  let fixture: ComponentFixture<FinalizedRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizedRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizedRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
