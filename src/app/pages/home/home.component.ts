import { Component } from '@angular/core';
import { FinanceService } from '../../services/finance/finance.service';
import { debounceTime, Observable, of, switchMap, tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { IChart } from '../../interfaces/chart';
import { ISymbols } from '../../interfaces/symbols';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    data$: Observable<IChart | undefined> | undefined;
    symbols$: Observable<ISymbols[]> | undefined;
    searchLoading: boolean = false;

    view: 'table' | 'chart' = 'table';
    public freeTextSearchControl = new FormControl();
    public symbolsControl = new FormControl();

    constructor(
        private readonly financeService: FinanceService,
    ) {
        this.onSearchChange();

        this.data$ = this.symbolsControl.valueChanges.pipe(
            switchMap((value?: string) => value ? this.financeService.getLastThirtyDaysChart(value) : of(undefined)),
        );
    }

    private onSearchChange(): void {
        this.symbols$ = this.freeTextSearchControl.valueChanges.pipe(
            debounceTime(300),
            switchMap(text => {
                this.setLoading(!!text);

                return text ? this.financeService.freeTextSearch(text) : of([]);
            }),
            tap(() => {
                    this.setLoading(false);
                }, () => this.setLoading(false),
            ),
        );
    }

    public onSearch({term}: { term: string }) {
        this.freeTextSearchControl.setValue(term);
    }

    private setLoading(value: boolean) {
        setTimeout(() => {
            this.searchLoading = value;
        }, 0);
    }
}
