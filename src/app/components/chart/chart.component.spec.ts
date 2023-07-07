import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';
import { NgChartsModule } from 'ng2-charts';

describe('ChartComponent', () => {
    let component: ChartComponent;
    let fixture: ComponentFixture<ChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NgChartsModule],
            declarations: [ChartComponent],
        })
            .compileComponents();

        fixture = TestBed.createComponent(ChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
