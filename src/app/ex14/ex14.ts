import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { CatalogService, Category } from '../services/catalog.service';

@Component({
  selector: 'app-ex14',
  standalone: true,
  imports: [NgFor],
  templateUrl: './ex14.html',
  styleUrls: ['./ex14.css']
})
export class Ex14 {
  categories: Category[] = [];

  constructor(private catalogService: CatalogService) {
    this.categories = this.catalogService.getCategories();
  }
}
