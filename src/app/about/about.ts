import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})
export class About {
  student_id: string = 'SV123';
  student_name: string = 'Trần Thanh';
  student_gmail: string = 'tranthanh@gmail.com';
  my_uni_image = 'khamphauel-5.jpg';
}