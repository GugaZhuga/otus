import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCollectionViewComponent } from './user-collection-view.component';

describe('UserCollectionViewComponent', () => {
  let component: UserCollectionViewComponent;
  let fixture: ComponentFixture<UserCollectionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCollectionViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCollectionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
