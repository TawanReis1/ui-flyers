import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFlierComponent } from './new-flier.component';

describe('NewFlierComponent', () => {
  let component: NewFlierComponent;
  let fixture: ComponentFixture<NewFlierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFlierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFlierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
