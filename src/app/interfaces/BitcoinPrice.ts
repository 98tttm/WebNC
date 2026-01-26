import { IBitcoinTime } from './BitcoinTime';
import { IBpi } from './Bpi';

export interface IBitcoinPrice {
    time: IBitcoinTime;
    disclaimer: string;
    chartName: string;
    bpi: {
        USD: IBpi;
        GBP: IBpi;
        EUR: IBpi;
    };
}
