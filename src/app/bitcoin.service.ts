import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { IBitcoinPrice } from './interfaces/BitcoinPrice';

@Injectable({
    providedIn: 'root'
})
export class BitcoinService {
    private _url: string = '/api.json';

    constructor(private _http: HttpClient) { }

    getBitcoinData(): Observable<IBitcoinPrice> {
        return this._http.get<IBitcoinPrice>(this._url).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    handleError(error: HttpErrorResponse) {
        return throwError(() => new Error(error.message));
    }
}
