import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FakeProductService } from '../fake-product.service';

@Component({
  selector: 'app-fake-product',
  imports: [CommonModule],
  templateUrl: './fake-product.html',
  styleUrls: ['./fake-product.css']
})
export class FakeProductComponent {
  data: any;
  errMessage: string = '';

  constructor(_service: FakeProductService) {
    _service.getFakeProductData().subscribe({
      next: (data) => { this.data = data; },
      error: (err) => {
        this.errMessage = err;
      }
    });
  }
}
