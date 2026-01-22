import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
})
export class Contact {
  name: string = 'wow';
  email: string = 'wow@gmail.com';
  phanhoi: string = '';

  sendContact(): void {
    this.phanhoi = `Đã nhận: ${this.name} <${this.email}>`;
    alert(`Đã nhận! [${this.name}]`);
  }
}