import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavpagesComponent } from './favpages.component';

describe('FavpagesComponent', () => {
  let component: FavpagesComponent;
  let fixture: ComponentFixture<FavpagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavpagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavpagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
