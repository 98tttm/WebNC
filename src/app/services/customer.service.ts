import { Injectable } from '@angular/core';

// Interface định nghĩa cấu trúc của Customer
export interface Customer {
  id: number;
  name: string;
  age: number;
  email: string;
  picture: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customers: Customer[] = [
    {"id":1,"name":"Nguyen Van An","age":20,"email":"an.nguyen@example.com", "picture":"Join.png"},
    {"id":2,"name":"Tran Thi Bich","age":21,"email":"bich.tran@example.com", "picture":"Jane.png"},
    {"id":3,"name":"Le Van Cuong","age":22,"email":"cuong.le@example.com", "picture":"Jim.png"},
    {"id":4,"name":"Jill","age":23,"email":"jill@example.com", "picture":"Jill.png"},
    {"id":5,"name":"Jack","age":24,"email":"jack@example.com", "picture":"Jack.png"},
    {"id":6,"name":"Jill","age":25,"email":"jill@example.com", "picture":"Jill.png"},
    {"id":7,"name":"Jack","age":26,"email":"jack@example.com", "picture":"Jack.png"},
    {"id":8,"name":"Jill","age":27,"email":"jill@example.com", "picture":"Jill.png"},
    {"id":9,"name":"Jack","age":28,"email":"jack@example.com", "picture":"Jack.png"},
    {"id":10,"name":"Jill","age":29,"email":"jill@example.com", "picture":"Jill.png"},
  ];

  get_all_customer(): Customer[] {
    return this.customers;
  }
}
