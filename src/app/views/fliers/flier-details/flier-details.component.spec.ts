import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlierDetailsComponent } from './flier-details.component';

describe('FlierDetailsComponent', () => {
  let component: FlierDetailsComponent;
  let fixture: ComponentFixture<FlierDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlierDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlierDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
