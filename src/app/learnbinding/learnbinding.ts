import { Component } from '@angular/core';

@Component({
  selector: 'app-learnbinding',
  standalone: true,
  imports: [],
  templateUrl: './learnbinding.html',
  styleUrl: './learnbinding.css',
})
export class Learnbinding {
  student_id = "K234111418"
  student_name = "Thinh"
  student_age = "22"
  student_gender = "Male"
  student_address = "HCM"
  red_text_style = {
    color: "red"
  }
}
