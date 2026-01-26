import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BitcoinService } from '../bitcoin.service';
import { IBitcoinPrice } from '../interfaces/BitcoinPrice';

@Component({
  selector: 'app-bitcoin',
  imports: [CommonModule],
  templateUrl: './bitcoin.html',
  styleUrls: ['./bitcoin.css']
})
export class BitcoinComponent implements OnInit {
  bitcoinData: IBitcoinPrice | null = null;
  errMessage: string = '';

  constructor(private _service: BitcoinService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this._service.getBitcoinData().subscribe({
      next: (data) => { this.bitcoinData = data; },
      error: (err) => {
        this.errMessage = err.message;
      }
    });
  }
}
