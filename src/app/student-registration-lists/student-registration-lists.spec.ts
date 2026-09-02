import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRegistrationLists } from './student-registration-lists';

describe('StudentRegistrationLists', () => {
  let component: StudentRegistrationLists;
  let fixture: ComponentFixture<StudentRegistrationLists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentRegistrationLists],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentRegistrationLists);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
