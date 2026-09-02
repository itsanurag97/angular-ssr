import { TestBed } from '@angular/core/testing';
import { IndivisualInterface } from './indivisual-interface';
describe('IndivisualInterface', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [IndivisualInterface],
        }).compileComponents();
        fixture = TestBed.createComponent(IndivisualInterface);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
