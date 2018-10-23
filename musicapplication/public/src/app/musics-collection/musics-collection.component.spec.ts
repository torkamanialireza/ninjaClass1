import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicsCollectionComponent } from './musics-collection.component';

describe('MusicsCollectionComponent', () => {
  let component: MusicsCollectionComponent;
  let fixture: ComponentFixture<MusicsCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicsCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicsCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
