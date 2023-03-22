import { Component, Input } from '@angular/core';
import { IChart } from '../../services/finance/finance.service';
import { ChartConfiguration } from 'chart.js';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
    chartData!: ChartConfiguration<'line'>['data'];
    currency?: string;

    @Input()
    set data(value: IChart) {
        const labels = value.list.map(el => el.day);
        const datasets = [
            {
                data: value.list.map(el => el.value),
                label: 'Preço',
                fill: true,
                tension: 0,
                borderColor: 'black',
                backgroundColor: 'rgba(163,163,163,0.3)',
            },
        ];

        this.chartData = {labels, datasets};
        this.currency = value.currency;
    }
}
