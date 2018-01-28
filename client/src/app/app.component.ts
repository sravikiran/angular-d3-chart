import { Component } from '@angular/core';
import { MarketStatusService } from './market-status.service';
import { Observable } from 'rxjs/Observable';
import { MarketPrice } from './market-price';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  marketUpdateObservable: Observable<MarketPrice>;
  marketStatus: MarketPrice[];
  marketStatusToPlot: MarketPrice[];

  set MarketStatus(status: MarketPrice[]) {
    this.marketStatus = status;
    this.marketStatusToPlot = this.marketStatus.slice(0, 20);
  }

  constructor(private marketStatusSvc: MarketStatusService) {
    this.marketStatusSvc.getInitialMarketStatus()
      .subscribe(prices => {
        this.MarketStatus = prices;

        this.marketUpdateObservable = this.marketStatusSvc.getUpdates();
        this.marketUpdateObservable.subscribe((latestStatus: MarketPrice) => {
          this.MarketStatus = [latestStatus].concat(this.marketStatus);
        });
      });

    // this.marketStatusToPlot = [{ "date": "19-03-2016", "open": 95.9299999999885, "close": 89.929999999989 },
    // { "date": "18-03-2016", "open": 92.529999999989, "close": 86.52999999999 },
    // { "date": "17-03-2016", "open": 91.579999999989, "close": 85.57999999999 },
    // { "date": "16-03-2016", "open": 82.959999999989, "close": 76.95999999999 },
    // { "date": "15-03-2016", "open": 79.959999999989, "close": 73.95999999999 },
    // { "date": "14-03-2016", "open": 78.359999999989, "close": 72.35999999999 },
    // { "date": "13-03-2016", "open": 68.809999999989, "close": 62.8099999999895 },
    // { "date": "12-03-2016", "open": 68.719999999988, "close": 62.719999999989 },
    // { "date": "11-03-2016", "open": 67.439999999989, "close": 61.43999999999 },
    // { "date": "10-03-2016", "open": 66.779999999989, "close": 60.77999999999 },
    // { "date": "09-03-2016", "open": 66.649999999989, "close": 60.64999999999 },
    // { "date": "08-03-2016", "open": 58.609999999989, "close": 52.60999999999 },
    // { "date": "07-03-2016", "open": 55.649999999989, "close": 49.64999999999 },
    // { "date": "06-03-2016", "open": 54.029999999989, "close": 48.02999999999 },
    // { "date": "05-03-2016", "open": 49.0999999999885, "close": 43.099999999989 },
    // { "date": "04-03-2016", "open": 47.189999999989, "close": 41.18999999999 },
    // { "date": "03-03-2016", "open": 44.489999999989, "close": 38.48999999999 },
    // { "date": "02-03-2016", "open": 40.319999999989, "close": 34.31999999999 },
    // { "date": "01-03-2016", "open": 32.3499999999885, "close": 26.349999999989 },
    // { "date": "29-02-2016", "open": 25.669999999988, "close": 19.669999999989 }];

    // this.marketStatusToPlot = [{
    //   "date": "20-May-2012",
    //   "close": 107.552,
    //   "open": 110.55
    // },
    // {
    //   "date": "18-May-2012",
    //   "close": 89.552,
    //   "open": 91.55
    // },
    // {
    //   "date": "16-May-2012",
    //   "close": 94.552,
    //   "open": 99.55
    // },
    // {
    //   "date": "14-May-2012",
    //   "close": 89.552,
    //   "open": 85.55
    // },
    // {
    //   "date": "12-May-2012",
    //   "close": 109.552,
    //   "open": 105.55
    // },
    // {
    //   "date": "10-May-2012",
    //   "close": 99.552,
    //   "open": 95.55
    // },
    // {
    //   "date": "8-May-2012",
    //   "close": 76.86,
    //   "open": 81.86
    // },
    // {
    //   "date": "6-May-2012",
    //   "close": 67.62,
    //   "open": 72.62
    // }];
  }
}
