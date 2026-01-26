import { Component } from '@angular/core';

@Component({
  selector: 'app-ptb1',
  imports: [],
  templateUrl: './ptb1.html',
  styleUrl: './ptb1.css',
})
export class Ptb1 {
  get_solution(hsa: HTMLInputElement, hsb: HTMLInputElement, result: HTMLElement) {
    if (hsa.value === '' || hsb.value === '') {
      result.innerHTML = 'Vui lòng nhập đầy đủ hệ số a và b';
      return;
    }

    let a = parseFloat(hsa.value);
    let b = parseFloat(hsb.value);

    if (isNaN(a) || isNaN(b)) {
      result.innerHTML = 'Hệ số phải là số';
      return;
    }

    if (a == 0 && b == 0) {
      result.innerHTML = 'Vô số nghiệm';
    } else if (a == 0) {
      result.innerHTML = 'Vô nghiệm';
    } else {
      result.innerHTML = 'Nghiệm của phương trình là: ' + -b / a;
    }
  }

  clear_result(hsa: HTMLInputElement, hsb: HTMLInputElement, result: HTMLElement) {
    hsa.value = '';
    hsb.value = '';
    result.innerHTML = '';
    hsa.focus();
  }
}
