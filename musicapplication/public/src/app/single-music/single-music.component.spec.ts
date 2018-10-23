import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMusicComponent } from './single-music.component';

describe('SingleMusicComponent', () => {
  let component: SingleMusicComponent;
  let fixture: ComponentFixture<SingleMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
