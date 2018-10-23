import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamAnimationComponent } from './stream-animation.component';

describe('StreamAnimationComponent', () => {
  let component: StreamAnimationComponent;
  let fixture: ComponentFixture<StreamAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
