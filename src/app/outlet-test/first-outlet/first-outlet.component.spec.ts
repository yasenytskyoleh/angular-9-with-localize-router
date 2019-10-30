import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstOutletComponent } from './first-outlet.component';

describe('FirstOutletComponent', () => {
  let component: FirstOutletComponent;
  let fixture: ComponentFixture<FirstOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
