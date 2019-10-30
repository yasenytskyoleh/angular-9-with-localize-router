import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestWithoutParamsComponent } from './test-without-params.component';

describe('TestWithoutParamsComponent', () => {
  let component: TestWithoutParamsComponent;
  let fixture: ComponentFixture<TestWithoutParamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestWithoutParamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWithoutParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
