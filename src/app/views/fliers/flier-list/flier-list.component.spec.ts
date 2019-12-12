import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlierListComponent } from './flier-list.component';

describe('FlierListComponent', () => {
  let component: FlierListComponent;
  let fixture: ComponentFixture<FlierListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlierListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
