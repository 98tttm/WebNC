import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Student } from '../models/student';

@Component({
  selector: 'app-template-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './template-form.html',
  styleUrls: ['./template-form.css']
})
export class TemplateFormComponent {
  studentModel = new Student('Nam Anh', 'anh@gmail.com', '0909090909', 'Python', 'toi');
  courses: string[] = ['Ruby', 'Python', 'Java', 'Golang', 'Angular'];
  errFlag: boolean = false;

  validateCourse(value: any): void {
    if (value === 'none') {
      this.errFlag = true;
    } else {
      this.errFlag = false;
    }
  }

  onSubmit(form: any): void {
    console.log('Form submitted:', form.value);
    console.log('Student Model:', this.studentModel);
  }
}
