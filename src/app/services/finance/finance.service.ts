import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IChart, IChartListItem } from '../../interfaces/chart';
import { ISymbols } from '../../interfaces/symbols';

@Injectable({
    providedIn: 'root',
})
export class FinanceService {
    private serviceUrl = 'finance';

    constructor(private readonly http: HttpClient) {
    }

    public getLastThirtyDaysChart(asset: string): Observable<IChart> {
        const query = 'includePrePost=false&interval=1d&useYfid=true&range=2mo';

        return this.http.get<any>(`/api/v8/${this.serviceUrl}/chart/${asset}?${query}`).pipe(
            map(response => {
                const [{timestamp = [], indicators: {quote = []}, meta}] = response?.chart?.result || [];
                const [{open = []}] = quote;
                const {currency = 'BRL', regularMarketPrice, regularMarketTime} = meta;

                const dates: number[] = timestamp.slice(-30).concat(regularMarketTime);
                const values: number[] = open.slice(-30).concat(regularMarketPrice);
                ;
                const [dayOneValue] = values;

                const calcPercentage = (value: number, lastValue: number): string => {
                    return ((value * 100 / lastValue) - 100).toFixed(2);
                };

                const list: IChartListItem[] = dates.map((date: number, index: number) => {
                    const value = values[index];
                    const lastDayValue = values[index - 1] || 0;

                    if (index === 30) {
                        return {
                            day: 'Atual',
                            date: date * 1000,
                            value,
                            swing: {
                                lastDay: index && lastDayValue && value ? calcPercentage(value, lastDayValue) : null,
                                dayOne: index && value ? calcPercentage(value, dayOneValue) : null,
                            },
                        };
                    }

                    return {
                        day: index + 1,
                        date: date * 1000,
                        value,
                        swing: {
                            lastDay: index && lastDayValue && value ? calcPercentage(value, lastDayValue) : null,
                            dayOne: index && value ? calcPercentage(value, dayOneValue) : null,
                        },
                    };
                });

                return {currency, list};
            }),
        );
    }

    public freeTextSearch(text: string): Observable<ISymbols[]> {
        return this.http.get<{ quotes: ISymbols[] }>(`/api/v1/${this.serviceUrl}/search?q=${text}`).pipe(
            map(({quotes}) => quotes),
        );
    }
}
