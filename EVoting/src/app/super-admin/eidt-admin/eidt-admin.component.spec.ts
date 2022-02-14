import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EidtAdminComponent } from './eidt-admin.component';

describe('EidtAdminComponent', () => {
  let component: EidtAdminComponent;
  let fixture: ComponentFixture<EidtAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EidtAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EidtAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
