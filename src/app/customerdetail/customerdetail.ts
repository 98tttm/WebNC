import { Component, OnInit } from '@angular/core';
import { CustomerService, Customer } from '../services/customer.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customerdetail',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './customerdetail.html',
  styleUrls: ['./customerdetail.css'],
})
export class Customerdetail implements OnInit {
  // Filtered customers list
  filteredCustomers: Customer[] = [];

  // Filter options
  filterAge: number = 25;
  filterType: string = 'older'; // 'older' or 'younger'
  // Data pulled from router param (if any)
  selectedCustomer?: Customer;
  routeCustomerNotFound = false;
  currentRouteId?: number;

  constructor(private customerService: CustomerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadCustomerFromRoute(id);
      } else {
        this.selectedCustomer = undefined;
        this.routeCustomerNotFound = false;
      }
    });
  }

  private loadCustomerFromRoute(id: string): void {
    const numericId = parseInt(id, 10);
    this.currentRouteId = Number.isNaN(numericId) ? undefined : numericId;
    const customers = this.customerService.get_all_customer();
    const found = customers.find(c => c.id === numericId);
    this.selectedCustomer = found;
    this.routeCustomerNotFound = !found;
  }

  search_customer_by_id(
    id: string,
    tdid: HTMLElement,
    tdname: HTMLElement,
    tdage: HTMLElement
  ): void {
    // Lấy tất cả customers từ service
    const customers = this.customerService.get_all_customer();

    // Tìm customer theo ID
    const customer = customers.find(c => c.id === parseInt(id));

    if (customer) {
      // Hiển thị thông tin customer lên table
      tdid.innerText = customer.id.toString();
      tdname.innerText = customer.name;
      tdage.innerText = customer.age.toString();
    } else {
      // Nếu không tìm thấy, hiển thị thông báo
      tdid.innerText = 'Not found';
      tdname.innerText = '';
      tdage.innerText = '';
    }
  }

  filterByAge(): void {
    const customers = this.customerService.get_all_customer();

    if (this.filterType === 'older') {
      // Filter customers older than the specified age
      this.filteredCustomers = customers.filter(c => c.age > this.filterAge);
    } else {
      // Filter customers younger than the specified age
      this.filteredCustomers = customers.filter(c => c.age < this.filterAge);
    }
  }
}
