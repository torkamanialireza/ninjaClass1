import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlyricComponent } from './addlyric.component';

describe('AddlyricComponent', () => {
  let component: AddlyricComponent;
  let fixture: ComponentFixture<AddlyricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddlyricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddlyricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
