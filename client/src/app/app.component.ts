import { Component } from '@angular/core';
import { MarketStatusService } from './market-status.service';
import { Observable } from 'rxjs';
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
  }
}
