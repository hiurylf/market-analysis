export interface IChart {
    list: IChartListItem[];
    currency: string;
}

export interface IChartListItem {
    day: number | string;
    date: number;
    value: number;
    swing: {
        lastDay: string | null;
        dayOne: string | null;
    },
}
