import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService, Customer } from '../services/customer.service';

@Component({
  selector: 'app-listcustomer2',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './listcustomer2.html',
  styleUrls: ['./listcustomer2.css'],
})
export class Listcustomer2 {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];

  // Filter options
  filterAge: number = 25;
  filterType: string = 'older'; // 'older' or 'younger'
  isFiltered: boolean = false;

  constructor(private cs: CustomerService) {
    this.customers = this.cs.get_all_customer();
    this.filteredCustomers = this.customers; // Show all by default
  }

  get_all_customers(): Customer[] {
    return this.customers;
  }

  filterByAge(): void {
    if (this.filterType === 'older') {
      this.filteredCustomers = this.customers.filter(c => c.age > this.filterAge);
    } else {
      this.filteredCustomers = this.customers.filter(c => c.age < this.filterAge);
    }
    this.isFiltered = true;
  }

  resetFilter(): void {
    this.filteredCustomers = this.customers;
    this.isFiltered = false;
  }
}
