import { TestBed } from '@angular/core/testing';
import { InterfaceComponent } from './interface-component';
describe('InterfaceComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InterfaceComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(InterfaceComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
