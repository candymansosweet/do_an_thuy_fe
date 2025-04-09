import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkManageComponent } from './work-manage.component';

describe('WorkManageComponent', () => {
  let component: WorkManageComponent;
  let fixture: ComponentFixture<WorkManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
