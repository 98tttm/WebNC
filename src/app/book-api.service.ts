import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Book } from './interfaces/Book';

@Injectable({
  providedIn: 'root',
})
export class BookAPIService {
  private baseUrl = '/books';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl).pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
  }

  create(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(this.baseUrl, book).pipe(catchError(this.handleError));
  }

  update(id: number, book: Partial<Book>): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/${id}`, book).pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
  }

  uploadCover(file: File): Observable<{ filename: string }> {
    const formData = new FormData();
    formData.append('anhbia', file);
    return this.http
      .post<{ filename: string }>(`${this.baseUrl}/upload-cover`, formData)
      .pipe(catchError(this.handleError));
  }

  getCoverUrl(filename: string): string {
    if (!filename) return '';
    return `/uploads/${filename}`;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error(error.message || 'Có lỗi xảy ra'));
  }
}
