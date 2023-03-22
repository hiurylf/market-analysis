import { Component, Input } from '@angular/core';
import { IChart } from '../../interfaces/chart';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
    @Input() data!: IChart;
}
