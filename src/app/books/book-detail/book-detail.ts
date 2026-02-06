import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookAPIService } from '../../book-api.service';
import { Book } from '../../interfaces/Book';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-detail.html',
  styleUrls: ['./book-detail.css'],
})
export class BookDetailComponent {
  book: Book | null = null;
  errMessage = '';

  constructor(private api: BookAPIService, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.getById(+id).subscribe({
        next: (b) => (this.book = b),
        error: (err) => (this.errMessage = err?.message || 'Không tải được chi tiết'),
      });
    }
  }

  getCoverUrl(filename: string): string {
    return this.api.getCoverUrl(filename);
  }

  formatDate(val: string): string {
    if (!val) return '—';
    const d = new Date(val);
    if (isNaN(d.getTime())) return val;
    return d.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
