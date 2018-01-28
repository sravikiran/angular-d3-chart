import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

import * as socketio from 'socket.io-client';

import { MarketPrice } from './market-price';

@Injectable()
export class MarketStatusService {

  constructor(private httpClient: HttpClient) { }

  getInitialMarketStatus() {
    return this.httpClient.get<MarketPrice[]>('http://localhost:3000/api/market');
  }

  getUpdates() {
    let socket = socketio('http://localhost:3000');
    let marketSub = new Subject<MarketPrice>();
    let marketSubObservable = Observable.from(marketSub);

    socket.on('market', (marketStatus: MarketPrice) => {
      marketSub.next(marketStatus);
    });

    return marketSubObservable;
  }
}
