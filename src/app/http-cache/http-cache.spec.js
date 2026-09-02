import { TestBed } from '@angular/core/testing';
import { HttpCache } from './http-cache';
describe('HttpCache', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpCache],
        }).compileComponents();
        fixture = TestBed.createComponent(HttpCache);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
