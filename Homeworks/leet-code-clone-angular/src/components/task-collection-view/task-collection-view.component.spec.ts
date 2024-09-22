import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCollectionViewComponent } from './task-collection-view.component';

describe('TaskViewComponent', () => {
  let component: TaskCollectionViewComponent;
  let fixture: ComponentFixture<TaskCollectionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCollectionViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCollectionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
