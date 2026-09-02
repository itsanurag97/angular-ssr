import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpCacheComponent } from './http-cache-component';

describe('HttpCacheComponent', () => {
  let component: HttpCacheComponent;
  let fixture: ComponentFixture<HttpCacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpCacheComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HttpCacheComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
