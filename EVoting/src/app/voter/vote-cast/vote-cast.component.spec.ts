import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteCastComponent } from './vote-cast.component';

describe('VoteCastComponent', () => {
  let component: VoteCastComponent;
  let fixture: ComponentFixture<VoteCastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteCastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteCastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
