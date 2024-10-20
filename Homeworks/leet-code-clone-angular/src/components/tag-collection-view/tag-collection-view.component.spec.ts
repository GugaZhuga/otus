import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCollectionViewComponent } from './tag-collection-view.component';

describe('TagCollectionViewComponent', () => {
  let component: TagCollectionViewComponent;
  let fixture: ComponentFixture<TagCollectionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagCollectionViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagCollectionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
